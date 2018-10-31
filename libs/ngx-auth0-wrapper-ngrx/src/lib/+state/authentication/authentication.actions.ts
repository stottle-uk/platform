import { Action } from '@ngrx/store';

export enum AuthenticationActionTypes {
  CheckAuthenticationStatus = '[Auth-Authentication] Check Authentication Status',
  UserIsAuthenticated = '[Auth-Authentication] User Is Authenticated',
  UserIsNotAuthenticated = '[Auth-Authentication] User Is Not Authenticated'
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

export type AuthenticationAction =
  | CheckAuthenticationStatus
  | UserIsAuthenticated
  | UserIsNotAuthenticated;

export const fromAuthenticationActions = {
  AuthenticationActionTypes,
  CheckAuthenticationStatus,
  UserIsAuthenticated,
  UserIsNotAuthenticated
};
