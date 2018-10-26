import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState, LAYOUT_FEATURE_KEY } from './layout.reducer';

const getLayoutState = createFeatureSelector<LayoutState>(LAYOUT_FEATURE_KEY);

const selectIsSideNavOpen = createSelector(
  getLayoutState,
  state => state.isSideNavOpen
);

export const layoutQuery = {
  selectIsSideNavOpen
};
