import { createSelector, MemoizedSelector } from '@ngrx/store';
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

export const authenticationQuery = {
  selectCheckingAuthenticationStatus
};
