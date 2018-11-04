import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  adapter,
  EmploymentState,
  EMPLOYMENT_FEATURE_KEY
} from './employment.reducer';

// Lookup the 'Employment' feature state managed by NgRx
const getEmploymentState = createFeatureSelector<EmploymentState>(
  EMPLOYMENT_FEATURE_KEY
);

const selectLoaded = createSelector(getEmploymentState, state => state.loaded);

const selectError = createSelector(getEmploymentState, state => state.error);

const selectSelectedId = createSelector(
  getEmploymentState,
  state => state.selectedId
);

export const { selectAll: selectAllEmployment } = adapter.getSelectors(
  getEmploymentState
);

const selectSelectedEmployment = createSelector(
  selectAllEmployment,
  selectSelectedId,
  (employment, id) => {
    const result = employment.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const employmentQuery = {
  selectLoaded,
  selectError,
  selectAllEmployment,
  selectSelectedEmployment
};
