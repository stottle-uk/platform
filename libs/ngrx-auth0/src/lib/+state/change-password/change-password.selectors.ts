import { createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { ChangePasswordState } from './change-password.reducer';

const selectChangePasswordState: MemoizedSelector<
  State,
  ChangePasswordState
> = createSelector(selectAuthState, auth => auth.changePassword);

const selectChangePasswordResponse: MemoizedSelector<
  State,
  string
> = createSelector(
  selectChangePasswordState,
  changePassword => changePassword.changePasswordResponse
);

const selectChangePasswordError: MemoizedSelector<
  State,
  auth0.Auth0Error
> = createSelector(selectChangePasswordState, userInfo => userInfo.error);

export const changePasswordQuery = {
  selectChangePasswordResponse,
  selectChangePasswordError
};
