import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from './';
import { RouterStateUrl } from './router.utils';

export const selectRouter = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  'router'
);

export const selectRouterState = createSelector(selectRouter, state => state.state);

export const selectCurrentUrl = createSelector(selectRouterState, state => state.url);

export const selectCurrentUrlParams = createSelector(selectRouterState, state => state.params);
