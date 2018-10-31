import { Action } from '@ngrx/store';
import { Authentication } from '@stottle-platform/ngx-auth0-wrapper';

export enum AuthorizationActionTypes {
  Authorize = '[Auth-Authorization] Authorize',
  AuthenticationComplete = '[Auth-Authorization] Authentication Complete',
  AuthenticationSuccess = '[Auth-Authorization] Authentication Success',
  AuthenticationError = '[Auth-Authorization] Authentication Error',
  ClearAuthenticationDetails = '[Auth-Authorization] Clear Authentication Details',
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
}

export class AuthenticationSuccess implements Action {
  readonly type = AuthorizationActionTypes.AuthenticationSuccess;

  constructor(public payload: { auth: Authentication }) {}
}

export class AuthenticationError implements Action {
  readonly type = AuthorizationActionTypes.AuthenticationError;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export class ClearAuthenticationDetails implements Action {
  readonly type = AuthorizationActionTypes.ClearAuthenticationDetails;
}

export class Logout implements Action {
  readonly type = AuthorizationActionTypes.Logout;
}

export type AuthorizationAction =
  | Authorize
  | AuthenticationComplete
  | AuthenticationSuccess
  | AuthenticationError
  | ClearAuthenticationDetails
  | Logout;

export const fromAuthorizationActions = {
  AuthorizationActionTypes,
  Authorize,
  AuthenticationComplete,
  AuthenticationSuccess,
  AuthenticationError,
  ClearAuthenticationDetails,
  Logout
};
