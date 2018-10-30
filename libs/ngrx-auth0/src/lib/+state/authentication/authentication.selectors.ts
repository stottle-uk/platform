import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Authentication } from '@stottle-platform/auth0-rxjs';
import { AuthState } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { AuthenticationState } from './authentication.reducer';

const selectAuthenticationState: MemoizedSelector<
  AuthState,
  AuthenticationState
> = createSelector(selectAuthState, auth => auth.authentication);

const selectCheckingAuthenticationStatus: MemoizedSelector<
  AuthState,
  boolean
> = createSelector(
  selectAuthenticationState,
  authentication => authentication.checkingAuthenticationStatus
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
  selectCheckingAuthenticationStatus,
  selectAuthenticationData
};
