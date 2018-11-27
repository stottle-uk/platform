import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  AuthDatesService,
  AuthProviderService
} from '@stottle-platform/ngx-auth0-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromAuthorizationActions } from '../authorization';
import { CheckSessionSuccess, fromCheckSessionActions } from '../check-session';
import {
  CheckAuthenticationStatus,
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
        !!authState &&
        !!authState.accessToken &&
        !!authState.expiresAt &&
        this.date.getTime() < authState.expiresAt
          ? new fromCheckSessionActions.CheckSessionStart()
          : new fromActions.UserIsNotAuthenticated()
    )
  );

  @Effect()
  checkSessionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<CheckSessionSuccess>(
      fromCheckSessionActions.CheckSessionActionTypes.CheckSessionSuccess
    ),
    map(() => new fromActions.UserIsAuthenticated())
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
