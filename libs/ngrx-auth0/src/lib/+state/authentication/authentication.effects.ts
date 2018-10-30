import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  AuthDatesService,
  AuthProviderService
} from '@stottle-platform/auth0-rxjs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  AuthenticationSuccess,
  fromAuthorizationActions,
  Logout
} from '../authorization/authorization.actions';
import {
  CheckAuthenticationStatus,
  ClearLocalStorage,
  fromAuthenticationActions as fromActions,
  UserIsNotAuthenticated
} from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
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
          ? new fromActions.UserIsAuthenticated()
          : new fromActions.UserIsNotAuthenticated()
    )
  );

  @Effect({ dispatch: false })
  authenticationSuccessDeleteRedirectUrl$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<AuthenticationSuccess>(
      fromAuthorizationActions.AuthorizationActionTypes.AuthenticationSuccess
    ),
    tap(() => (this.auth.redirectUrl = null))
  );

  @Effect()
  authenticationSuccessSetAuthenticationState$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<AuthenticationSuccess>(
      fromAuthorizationActions.AuthorizationActionTypes.AuthenticationSuccess
    ),
    map(action => action.payload.auth),
    map(auth => new fromActions.SetAuthenticationState({ auth }))
  );

  @Effect()
  logoutUserIsNotAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType<Logout>(fromAuthorizationActions.AuthorizationActionTypes.Logout),
    map(() => new fromActions.UserIsNotAuthenticated())
  );

  @Effect()
  userIsNotAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType<UserIsNotAuthenticated>(
      fromActions.AuthenticationActionTypes.UserIsNotAuthenticated
    ),
    map(() => new fromActions.ClearLocalStorage())
  );

  @Effect({ dispatch: false })
  clearLocalStorage$: Observable<void> = this.actions$.pipe(
    ofType<ClearLocalStorage>(
      fromActions.AuthenticationActionTypes.ClearLocalStorage
    ),
    map(() => this.auth.clearLocalStorage())
  );

  constructor(
    private actions$: Actions,
    private auth: AuthProviderService,
    private date: AuthDatesService
  ) {}
}
