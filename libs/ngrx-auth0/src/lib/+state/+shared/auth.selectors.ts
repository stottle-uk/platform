import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.models';

export const selectAuthState: MemoizedSelector<
  object,
  AuthState
> = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);
