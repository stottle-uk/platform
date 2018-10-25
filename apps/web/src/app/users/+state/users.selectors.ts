import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
const getUsersState = createFeatureSelector<UsersState>('users');

const getLoaded = createSelector(
  getUsersState,
  (state: UsersState) => state.loaded
);
const getError = createSelector(
  getUsersState,
  (state: UsersState) => state.error
);

const getAllUsers = createSelector(
  getUsersState,
  getLoaded,
  (state: UsersState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getUsersState,
  (state: UsersState) => state.selectedId
);
const getSelectedUsers = createSelector(
  getAllUsers,
  getSelectedId,
  (users, id) => {
    const result = users.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const usersQuery = {
  getLoaded,
  getError,
  getAllUsers,
  getSelectedUsers
};
