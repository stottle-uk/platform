import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { UserInfoState } from './user-info.reducer';

const selectUserInfoState: MemoizedSelector<
  AuthState,
  UserInfoState
> = createSelector(selectAuthState, auth => auth.userInfo);

const selectUserInfo: MemoizedSelector<
  AuthState,
  auth0.Auth0UserProfile
> = createSelector(selectUserInfoState, userInfo => userInfo.userInfo);

const selectUserInfoError: MemoizedSelector<
  AuthState,
  auth0.Auth0Error
> = createSelector(selectUserInfoState, userInfo => userInfo.error);

const selectUserInfoIsLoading: MemoizedSelector<
  AuthState,
  boolean
> = createSelector(selectUserInfoState, userInfo => userInfo.loading);

const selectUserInfoIsLoaded: MemoizedSelector<
  AuthState,
  boolean
> = createSelector(selectUserInfoState, userInfo => userInfo.loaded);

export const userInfoQuery = {
  selectUserInfo,
  selectUserInfoError,
  selectUserInfoIsLoading,
  selectUserInfoIsLoaded
};
