import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthProviderService } from '@stottle-platform/auth0-rxjs';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  AuthenticationComplete,
  Authorize,
  fromAuthorizationActions as fromActions,
  Logout
} from './authorization.actions';

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
    ofType<AuthenticationComplete>(
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
  logout$: Observable<void> = this.actions$.pipe(
    ofType<Logout>(fromActions.AuthorizationActionTypes.Logout),
    map(() => this.auth.logout())
  );

  constructor(private actions$: Actions, private auth: AuthProviderService) {}
}
