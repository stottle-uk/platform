import { Action } from '@ngrx/store';

export enum AuthorizationActionTypes {
  Authorize = '[Auth-Authorization] Authorize',
  AuthenticationComplete = '[Auth-Authorization] Authentication Complete',
  AuthenticationSuccess = '[Auth-Authorization] Authentication Success',
  AuthenticationError = '[Auth-Authorization] Authentication Error',
  Logout = '[Auth-Authorization] Logout'
}

export class Authorize implements Action {
  readonly type = AuthorizationActionTypes.Authorize;

  constructor(
    public payload: { redirectUrl: string; options: auth0.AuthorizeOptions }
  ) {}
}

export class AuthenticationComplete implements Action {
  readonly type = AuthorizationActionTypes.AuthenticationComplete;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export class AuthenticationSuccess implements Action {
  readonly type = AuthorizationActionTypes.AuthenticationSuccess;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export class AuthenticationError implements Action {
  readonly type = AuthorizationActionTypes.AuthenticationError;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export class Logout implements Action {
  readonly type = AuthorizationActionTypes.Logout;
}

export type AuthorizationAction =
  | Authorize
  | AuthenticationComplete
  | AuthenticationSuccess
  | AuthenticationError
  | Logout;

export const fromAuthorizationActions = {
  AuthorizationActionTypes,
  Authorize,
  AuthenticationComplete,
  AuthenticationSuccess,
  AuthenticationError,
  Logout
};
