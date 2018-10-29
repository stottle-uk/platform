import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State } from './auth.models';

export const selectAuthState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>(AUTH_FEATURE_KEY);
