import { createFeatureSelector } from '@ngrx/store';
import { ChangePasswordState } from './change-password.reducer';

const getChangePasswordState = createFeatureSelector<ChangePasswordState>(
  'changePassword'
);

// const getLoaded = createSelector(
//   getChangePasswordState,
//   (state: ChangePasswordState) => state.loaded
// );
// const getError = createSelector(
//   getChangePasswordState,
//   (state: ChangePasswordState) => state.error
// );

// const getAllChangePassword = createSelector(
//   getChangePasswordState,
//   getLoaded,
//   (state: ChangePasswordState, isLoaded) => {
//     return isLoaded ? state.list : [];
//   }
// );
// const getSelectedId = createSelector(
//   getChangePasswordState,
//   (state: ChangePasswordState) => state.selectedId
// );
// const getSelectedChangePassword = createSelector(
//   getAllChangePassword,
//   getSelectedId,
//   (changePassword, id) => {
//     const result = changePassword.find(it => it['id'] === id);
//     return result ? Object.assign({}, result) : undefined;
//   }
// );

// export const changePasswordQuery = {
//   getLoaded,
//   getError,
//   getAllChangePassword,
//   getSelectedChangePassword
// };
