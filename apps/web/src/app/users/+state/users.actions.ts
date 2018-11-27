import { Action } from '@ngrx/store';
import { Entity } from './users.reducer';

export enum UsersActionTypes {
  LoadUsers = '[Users] Load Users',
  UsersLoaded = '[Users] Users Loaded',
  UsersLoadError = '[Users] Users Load Error',
  ConnectToRealtimeService = '[Users] Connect Tp Realtime Service'
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

export class ConnectToRealtimeService implements Action {
  readonly type = UsersActionTypes.ConnectToRealtimeService;
}

export type UsersAction =
  | LoadUsers
  | UsersLoaded
  | UsersLoadError
  | ConnectToRealtimeService;

export const fromUsersActions = {
  UsersActionTypes,
  LoadUsers,
  UsersLoaded,
  UsersLoadError,
  ConnectToRealtimeService
};
