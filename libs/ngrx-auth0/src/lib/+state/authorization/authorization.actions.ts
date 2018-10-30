import { Action } from '@ngrx/store';

export enum AuthorizationActionTypes {
  Authorize = '[Auth-Authorization] Authorize',
  Logout = '[Auth-Authorization] Logout',
  AuthenticationError = '[Auth-Authorization] Authentication Error'
}

export class Authorize implements Action {
  readonly type = AuthorizationActionTypes.Authorize;

  constructor(
    public payload: { redirectUrl: string; options: auth0.AuthorizeOptions }
  ) {}
}

export class Logout implements Action {
  readonly type = AuthorizationActionTypes.Logout;
}

export class AuthenticationError implements Action {
  readonly type = AuthorizationActionTypes.AuthenticationError;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export type AuthorizationAction = Authorize | Logout | AuthenticationError;

export const fromAuthorizationActions = {
  AuthorizationActionTypes,
  Authorize,
  Logout,
  AuthenticationError
};
