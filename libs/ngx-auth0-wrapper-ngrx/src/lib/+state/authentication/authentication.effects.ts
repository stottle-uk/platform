import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  AuthDatesService,
  AuthProviderService
} from '@stottle-platform/auth0-rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromAuthorizationActions } from '../authorization';
import { fromCheckSessionActions } from '../check-session';
import {
  CheckAuthenticationStatus,
  fromAuthenticationActions as fromActions,
  UserIsAuthenticated,
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

  @Effect()
  userIsAuthenticatedScheduleSessionCheck$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<UserIsAuthenticated>(
      fromActions.AuthenticationActionTypes.UserIsAuthenticated
    ),
    map(() => new fromCheckSessionActions.CheckSessionStart())
  );

  @Effect()
  clearLocalStorage$: Observable<Action> = this.actions$.pipe(
    ofType<UserIsNotAuthenticated>(
      fromActions.AuthenticationActionTypes.UserIsNotAuthenticated
    ),
    map(() => new fromAuthorizationActions.ClearAuthenticationDetails())
  );

  constructor(
    private actions$: Actions,
    private auth: AuthProviderService,
    private date: AuthDatesService
  ) {}
}
