import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Authentication, State } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { AuthenticationState } from './authentication.reducer';

const selectAuthenticationState: MemoizedSelector<
  State,
  AuthenticationState
> = createSelector(selectAuthState, auth => auth.authentication);

const selectAuthenticationError: MemoizedSelector<
  State,
  auth0.Auth0Error
> = createSelector(
  selectAuthenticationState,
  authentication => authentication.error
);

const selectAuthenticationData: MemoizedSelector<
  State,
  Authentication
> = createSelector(
  selectAuthenticationState,
  authentication => authentication.authenticationData
);

const selectIsAuthenticated: (
  time: number
) => MemoizedSelector<State, string> = time =>
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
