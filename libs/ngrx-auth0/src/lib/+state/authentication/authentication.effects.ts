import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  AuthDatesService,
  Authentication,
  AuthProviderService
} from '@stottle-platform/auth0-rxjs';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import {
  Authorize,
  CheckAuthenticationStatus,
  fromAuthenticationActions as fromActions,
  Logout,
  UserIsAuthenticated
} from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  @Effect()
  handleAuthentication$: Observable<Action> = this.actions$.pipe(
    take(1),
    exhaustMap(() =>
      this.auth.handleAuthentication().pipe(
        map(
          auth =>
            new fromActions.UserIsAuthenticated({
              auth
            })
        ),
        catchError(error => of(new fromActions.AuthenticationError({ error })))
      )
    )
  );

  @Effect()
  checkAuthenticationStatus$: Observable<Action> = this.actions$.pipe(
    ofType<CheckAuthenticationStatus>(
      fromActions.AuthenticationActionTypes.CheckAuthenticationStatus
    ),
    map(() => this.auth.getAuthState()),
    map(
      authState =>
        !!authState.accessToken &&
        !!authState.expiresAt &&
        this.date.getTime() < authState.expiresAt
          ? new fromActions.UserIsAuthenticated({
              auth: authState
            })
          : new fromActions.UserIsNotAuthenticated()
    )
  );

  @Effect({ dispatch: false })
  authorize$: Observable<void> = this.actions$.pipe(
    ofType<Authorize>(fromActions.AuthenticationActionTypes.Authorize),
    map(action => action.payload.options),
    map(options => this.auth.authorize(options))
  );

  @Effect({ dispatch: false })
  loginSaveRedirectUrl$: Observable<string> = this.actions$.pipe(
    ofType<Authorize>(fromActions.AuthenticationActionTypes.Authorize),
    map(action => action.payload.redirectUrl),
    tap(redirectUrl => (this.auth.redirectUrl = redirectUrl))
  );

  @Effect({ dispatch: false })
  logout$: Observable<void> = this.actions$.pipe(
    ofType<Logout>(fromActions.AuthenticationActionTypes.Logout),
    map(() => this.auth.logout())
  );

  @Effect({ dispatch: false })
  handleAuthenticationDeleteRedirectUrl$: Observable<
    Authentication
  > = this.actions$.pipe(
    ofType<UserIsAuthenticated>(
      fromActions.AuthenticationActionTypes.UserIsAuthenticated
    ),
    map(action => action.payload.auth),
    tap(() => (this.auth.redirectUrl = null))
  );

  constructor(
    private actions$: Actions,
    private auth: AuthProviderService,
    private date: AuthDatesService
  ) {}
}
