import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Authentication, AuthState } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { AuthenticationState } from './authentication.reducer';

const selectAuthenticationState: MemoizedSelector<
  AuthState,
  AuthenticationState
> = createSelector(selectAuthState, auth => auth.authentication);

const selectAuthenticationError: MemoizedSelector<
  AuthState,
  auth0.Auth0Error
> = createSelector(
  selectAuthenticationState,
  authentication => authentication.error
);

const selectAuthenticationData: MemoizedSelector<
  AuthState,
  Authentication
> = createSelector(
  selectAuthenticationState,
  authentication => authentication.authenticationData
);

const selectIsAuthenticated: (
  time: number
) => MemoizedSelector<AuthState, string> = time =>
  createSelector(
    selectAuthenticationData,
    authenticationData =>
      authenticationData &&
      !!authenticationData.accessToken &&
      !!authenticationData.expiresAt &&
      time < +authenticationData.expiresAt
        ? authenticationData.accessToken
        : null
  );

export const authenticationQuery = {
  selectIsAuthenticated,
  selectAuthenticationError,
  selectAuthenticationData
};
