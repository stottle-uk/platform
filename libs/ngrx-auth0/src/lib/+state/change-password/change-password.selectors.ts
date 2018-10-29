import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { ChangePasswordState } from './change-password.reducer';

const selectChangePasswordState: MemoizedSelector<
  AuthState,
  ChangePasswordState
> = createSelector(selectAuthState, auth => auth.changePassword);

const selectChangePasswordResponse: MemoizedSelector<
  AuthState,
  string
> = createSelector(
  selectChangePasswordState,
  changePassword => changePassword.changePasswordResponse
);

const selectChangePasswordError: MemoizedSelector<
  AuthState,
  auth0.Auth0Error
> = createSelector(selectChangePasswordState, userInfo => userInfo.error);

export const changePasswordQuery = {
  selectChangePasswordResponse,
  selectChangePasswordError
};
