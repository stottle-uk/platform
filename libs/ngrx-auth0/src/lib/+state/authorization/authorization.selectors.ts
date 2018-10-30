import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState, selectAuthState } from '../+shared';
import { AuthorizationState } from './authorization.reducer';

const selectAuthorizationState: MemoizedSelector<
  AuthState,
  AuthorizationState
> = createSelector(selectAuthState, auth => auth.authorization);

const selectAuthorizationError: MemoizedSelector<
  AuthState,
  auth0.Auth0Error
> = createSelector(
  selectAuthorizationState,
  authorization => authorization.error
);

export const authorizationQuery = {
  selectAuthorizationError
};
