import { createFeatureSelector } from '@ngrx/store';
import { CheckSessionState } from './check-session.reducer';

// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { CheckSessionState } from './check-session.reducer';

// // Lookup the 'CheckSession' feature state managed by NgRx
// const getCheckSessionState = createFeatureSelector<CheckSessionState>(
//   'checkSession'
// );

const getCheckSessionState = createFeatureSelector<CheckSessionState>(
  'checkSession'
);

// const getLoaded = createSelector(
//   getCheckSessionState,
//   (state: CheckSessionState) => state.loaded
// );
// const getError = createSelector(
//   getCheckSessionState,
//   (state: CheckSessionState) => state.error
// );

// const getAllCheckSession = createSelector(
//   getCheckSessionState,
//   getLoaded,
//   (state: CheckSessionState, isLoaded) => {
//     return isLoaded ? state.list : [];
//   }
// );
// const getSelectedId = createSelector(
//   getCheckSessionState,
//   (state: CheckSessionState) => state.selectedId
// );
// const getSelectedCheckSession = createSelector(
//   getAllCheckSession,
//   getSelectedId,
//   (checkSession, id) => {
//     const result = checkSession.find(it => it['id'] === id);
//     return result ? Object.assign({}, result) : undefined;
//   }
// );

// export const checkSessionQuery = {
//   getLoaded,
//   getError,
//   getAllCheckSession,
//   getSelectedCheckSession
// };
