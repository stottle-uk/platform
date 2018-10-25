import { Action } from '@ngrx/store';
import { Entity } from './users.reducer';

export enum UsersActionTypes {
  LoadUsers = '[Users] Load Users',
  UsersLoaded = '[Users] Users Loaded',
  UsersLoadError = '[Users] Users Load Error'
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

export class UsersLoadError implements Action {
  readonly type = UsersActionTypes.UsersLoadError;
  constructor(public payload: any) {}
}

export class UsersLoaded implements Action {
  readonly type = UsersActionTypes.UsersLoaded;
  constructor(public payload: Entity[]) {}
}

export type UsersAction = LoadUsers | UsersLoaded | UsersLoadError;

export const fromUsersActions = {
  LoadUsers,
  UsersLoaded,
  UsersLoadError
};
