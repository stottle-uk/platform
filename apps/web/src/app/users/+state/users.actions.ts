import { Action } from '@ngrx/store';
import { Authentication } from '@stottle-platform/ngx-auth0-wrapper';
import { Entity } from './users.reducer';

export enum UsersActionTypes {
  LoadUsers = '[Users] Load Users',
  UsersLoaded = '[Users] Users Loaded',
  UsersLoadError = '[Users] Users Load Error',
  AuthenticationRedirect = '[Users] Authentication Redirect',
  ConnectToRealtimeService = '[Users] Connect To Realtime Service'
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

export class AuthenticationRedirect implements Action {
  readonly type = UsersActionTypes.AuthenticationRedirect;

  constructor(public payload: { auth: Authentication }) {}
}

export class ConnectToRealtimeService implements Action {
  readonly type = UsersActionTypes.ConnectToRealtimeService;
  constructor(public payload: { auth: Authentication }) {}
}

export type UsersAction =
  | LoadUsers
  | UsersLoaded
  | UsersLoadError
  | AuthenticationRedirect
  | ConnectToRealtimeService;

export const fromUsersActions = {
  UsersActionTypes,
  LoadUsers,
  UsersLoaded,
  UsersLoadError,
  AuthenticationRedirect,
  ConnectToRealtimeService
};
