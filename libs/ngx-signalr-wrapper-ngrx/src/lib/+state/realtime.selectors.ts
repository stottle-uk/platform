import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RealtimeState } from './realtime.reducer';

// Lookup the 'Realtime' feature state managed by NgRx
const getRealtimeState = createFeatureSelector<RealtimeState>('realtime');

const getLoaded = createSelector(
  getRealtimeState,
  (state: RealtimeState) => state.loaded
);
const getError = createSelector(
  getRealtimeState,
  (state: RealtimeState) => state.error
);

const getAllRealtime = createSelector(
  getRealtimeState,
  getLoaded,
  (state: RealtimeState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getRealtimeState,
  (state: RealtimeState) => state.selectedId
);
const getSelectedRealtime = createSelector(
  getAllRealtime,
  getSelectedId,
  (realtime, id) => {
    const result = realtime.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const realtimeQuery = {
  getLoaded,
  getError,
  getAllRealtime,
  getSelectedRealtime
};
