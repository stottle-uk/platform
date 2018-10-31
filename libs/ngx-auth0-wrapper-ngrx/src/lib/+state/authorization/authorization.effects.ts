import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthProviderService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthenticationSuccess, Authorize, ClearAuthenticationDetails, fromAuthorizationActions as fromActions, Logout } from './authorization.actions';

@Injectable()
export class AuthorizationEffects {
  @Effect({ dispatch: false })
  authorize$: Observable<void> = this.actions$.pipe(
    ofType<Authorize>(fromActions.AuthorizationActionTypes.Authorize),
    map(action => action.payload.options),
    map(options => this.auth.authorize(options))
  );

  @Effect({ dispatch: false })
  authorizeSaveRedirectUrl$: Observable<string> = this.actions$.pipe(
    ofType<Authorize>(fromActions.AuthorizationActionTypes.Authorize),
    map(action => action.payload.redirectUrl),
    tap(redirectUrl => (this.auth.redirectUrl = redirectUrl))
  );

  @Effect()
  handleAuthentication$: Observable<Action> = this.actions$.pipe(
    ofType<AuthenticationSuccess>(
      fromActions.AuthorizationActionTypes.AuthenticationComplete
    ),
    exhaustMap(() =>
      this.auth.handleAuthentication().pipe(
        map(
          auth =>
            new fromActions.AuthenticationSuccess({
              auth
            })
        ),
        catchError(error => of(new fromActions.AuthenticationError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  authenticationSuccessDeleteRedirectUrl$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<AuthenticationSuccess>(
      fromActions.AuthorizationActionTypes.AuthenticationSuccess
    ),
    tap(() => (this.auth.redirectUrl = null))
  );

  @Effect({ dispatch: false })
  logout$: Observable<void> = this.actions$.pipe(
    ofType<Logout>(fromActions.AuthorizationActionTypes.Logout),
    map(() => this.auth.logout())
  );

  @Effect()
  logoutClearLocalStorage$: Observable<Action> = this.actions$.pipe(
    ofType<Logout>(fromActions.AuthorizationActionTypes.Logout),
    map(() => new fromActions.ClearAuthenticationDetails())
  );

  @Effect({ dispatch: false })
  clearLocalStorage$: Observable<void> = this.actions$.pipe(
    ofType<ClearAuthenticationDetails>(
      fromActions.AuthorizationActionTypes.ClearAuthenticationDetails
    ),
    map(() => this.auth.clearLocalStorage())
  );

  constructor(private actions$: Actions, private auth: AuthProviderService) {}
}
