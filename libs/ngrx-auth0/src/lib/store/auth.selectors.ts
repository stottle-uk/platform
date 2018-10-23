import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { Authentication } from '@stottle-platform/auth0-rxjs';
import {
  getAuth,
  getChangePasswordResponse,
  getError,
  getUserInfo,
  State
} from './auth.reducer';

export const selectAuthState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('auth');

export const selectAuth: MemoizedSelector<
  State,
  Authentication
> = createSelector(selectAuthState, getAuth);

export const selectUserInfo: MemoizedSelector<
  State,
  auth0.Auth0UserProfile
> = createSelector(selectAuthState, getUserInfo);

export const selectChangePasswordResponse: MemoizedSelector<
  State,
  string
> = createSelector(selectAuthState, getChangePasswordResponse);

export const selectError: MemoizedSelector<State, any> = createSelector(
  selectAuthState,
  getError
);

export const selectIsAuthenticated: (
  time: number
) => MemoizedSelector<State, boolean> = time =>
  createSelector(
    selectAuth,
    auth =>
      auth && !!auth.accessToken && !!auth.expiresAt && time < +auth.expiresAt
  );
