import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  AuthenticationEffects,
  authenticationReducer,
  AuthenticationState
} from './authentication';
import { Authentication } from './authentication/authentication.model';
import { UserInfoEffects, userInfoReducer, UserInfoState } from './user-info';

export * from './authentication';
export * from './user-info';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  authentication: AuthenticationState;
  userInfo: UserInfoState;
}

export const authReducers: ActionReducerMap<State> = {
  authentication: authenticationReducer,
  userInfo: userInfoReducer
};

export const authEffects = [AuthenticationEffects, UserInfoEffects];

const selectAuthState: MemoizedSelector<object, State> = createFeatureSelector<
  State
>(AUTH_FEATURE_KEY);

// Authentication Selectors

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

// user info selectors

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
