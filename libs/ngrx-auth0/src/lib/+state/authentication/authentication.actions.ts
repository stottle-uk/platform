import { Action } from '@ngrx/store';
import { Authentication } from '@stottle-platform/auth0-rxjs';

export enum AuthenticationActionTypes {
  CheckAuthenticationStatus = '[Auth-Authentication] Check Authentication Status',
  UserIsAuthenticated = '[Auth-Authentication] User Is Authenticated',
  UserIsNotAuthenticated = '[Auth-Authentication] User Is Not Authenticated',
  SetAuthenticationState = '[Auth-Authentication] Set Authentication State',
  ClearLocalStorage = '[Auth-Authentication] Clear Local Storage'
}

export class CheckAuthenticationStatus implements Action {
  readonly type = AuthenticationActionTypes.CheckAuthenticationStatus;
}

export class UserIsAuthenticated implements Action {
  readonly type = AuthenticationActionTypes.UserIsAuthenticated;
}

export class UserIsNotAuthenticated implements Action {
  readonly type = AuthenticationActionTypes.UserIsNotAuthenticated;
}

export class SetAuthenticationState implements Action {
  readonly type = AuthenticationActionTypes.SetAuthenticationState;

  constructor(public payload: { auth: Authentication }) {}
}

export class ClearLocalStorage implements Action {
  readonly type = AuthenticationActionTypes.ClearLocalStorage;
}

export type AuthenticationAction =
  | CheckAuthenticationStatus
  | UserIsAuthenticated
  | UserIsNotAuthenticated
  | SetAuthenticationState
  | ClearLocalStorage;

export const fromAuthenticationActions = {
  AuthenticationActionTypes,
  CheckAuthenticationStatus,
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  SetAuthenticationState,
  ClearLocalStorage
};
