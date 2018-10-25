import { UsersAction, UsersActionTypes } from './users.actions';

export const USERS_FEATURE_KEY = 'users';

/**
 * Interface for the 'Users' data used in
 *  - UsersState, and
 *  - usersReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface UsersState {
  list: Entity[]; // list of Users; analogous to a sql normalized table
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: any; // last none error (if any)
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialState: UsersState = {
  list: [],
  loaded: false
};

export function usersReducer(
  state: UsersState = initialState,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case UsersActionTypes.UsersLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
