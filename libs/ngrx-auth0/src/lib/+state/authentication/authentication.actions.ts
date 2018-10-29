import { Action } from '@ngrx/store';
import { Authentication } from '@stottle-platform/auth0-rxjs';

export enum AuthenticationActionTypes {
  CheckAuthenticationStatus = '[Auth-Authentication] Check Authentication Status',
  UserIsAuthenticated = '[Auth-Authentication] User Is Authenticated',
  UserIsNotAuthenticated = '[Auth-Authentication] User Is Not Authenticated',
  Authorize = '[Auth-Authentication] Authorize',
  Logout = '[Auth-Authentication] Logout',
  ClearLocalStorage = '[Auth-Authentication] Clear Local Storage',
  AuthenticationError = '[Auth-Authentication] Authentication Error'
}

export class CheckAuthenticationStatus implements Action {
  readonly type = AuthenticationActionTypes.CheckAuthenticationStatus;
}

export class UserIsAuthenticated implements Action {
  readonly type = AuthenticationActionTypes.UserIsAuthenticated;

  constructor(public payload: { auth: Authentication }) {}
}

export class UserIsNotAuthenticated implements Action {
  readonly type = AuthenticationActionTypes.UserIsNotAuthenticated;
}

export class Authorize implements Action {
  readonly type = AuthenticationActionTypes.Authorize;

  constructor(
    public payload: { redirectUrl: string; options: auth0.AuthorizeOptions }
  ) {}
}

export class Logout implements Action {
  readonly type = AuthenticationActionTypes.Logout;
}

export class ClearLocalStorage implements Action {
  readonly type = AuthenticationActionTypes.ClearLocalStorage;
}

export class AuthenticationError implements Action {
  readonly type = AuthenticationActionTypes.AuthenticationError;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export type AuthenticationAction =
  | CheckAuthenticationStatus
  | UserIsAuthenticated
  | UserIsNotAuthenticated
  | Authorize
  | Logout
  | ClearLocalStorage
  | AuthenticationError;

export const fromAuthenticationActions = {
  AuthenticationActionTypes,
  CheckAuthenticationStatus,
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  Authorize,
  Logout,
  ClearLocalStorage,
  AuthenticationError
};
