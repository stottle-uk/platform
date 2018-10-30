import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Authentication } from '@stottle-platform/auth0-rxjs';
import { AuthState, selectAuthState } from '../+shared';
import { AuthorizationState } from './authorization.reducer';

const selectAuthorizationState: MemoizedSelector<
  AuthState,
  AuthorizationState
> = createSelector(selectAuthState, auth => auth.authorization);

const selectAuthorizationData: MemoizedSelector<
  AuthState,
  Authentication
> = createSelector(
  selectAuthorizationState,
  authorization => authorization.authorizationData
);

const selectIsAuthenticated: (
  time: number
) => MemoizedSelector<AuthState, string> = time =>
  createSelector(
    selectAuthorizationData,
    authorizationData =>
      authorizationData &&
      !!authorizationData.accessToken &&
      !!authorizationData.expiresAt &&
      time < +authorizationData.expiresAt
        ? authorizationData.accessToken
        : null
  );

const selectAuthorizationError: MemoizedSelector<
  AuthState,
  auth0.Auth0Error
> = createSelector(
  selectAuthorizationState,
  authorization => authorization.error
);

export const authorizationQuery = {
  selectAuthorizationData,
  selectIsAuthenticated,
  selectAuthorizationError
};
