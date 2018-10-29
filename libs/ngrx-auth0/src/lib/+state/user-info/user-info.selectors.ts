import { createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from '../+shared/auth.modesl';
import { selectAuthState } from '../+shared/auth.selectors';
import { UserInfoState } from './user-info.reducer';

const selectUserInfoState: MemoizedSelector<
  State,
  UserInfoState
> = createSelector(selectAuthState, auth => auth.userInfo);

const selectUserInfo: MemoizedSelector<
  State,
  auth0.Auth0UserProfile
> = createSelector(selectUserInfoState, userInfo => userInfo.userInfo);

const selectUserInfoError: MemoizedSelector<
  State,
  auth0.Auth0Error
> = createSelector(selectUserInfoState, userInfo => userInfo.error);

const selectUserInfoIsLoading: MemoizedSelector<
  State,
  boolean
> = createSelector(selectUserInfoState, userInfo => userInfo.loading);

const selectUserInfoIsLoaded: MemoizedSelector<State, boolean> = createSelector(
  selectUserInfoState,
  userInfo => userInfo.loaded
);

export const userInfoQuery = {
  selectUserInfo,
  selectUserInfoError,
  selectUserInfoIsLoading,
  selectUserInfoIsLoaded
};
