import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { AuthenticationState } from './authentication.reducer';

const selectAuthenticationState: MemoizedSelector<
  AuthState,
  AuthenticationState
> = createSelector(selectAuthState, auth => auth.authentication);

const selectAuthenticationStatusChecked: MemoizedSelector<
  AuthState,
  boolean
> = createSelector(
  selectAuthenticationState,
  authentication => authentication.authenticationStatusChecked
);

export const authenticationQuery = {
  selectAuthenticationStatusChecked
};
