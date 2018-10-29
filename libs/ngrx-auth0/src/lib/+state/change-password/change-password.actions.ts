import { Action } from '@ngrx/store';

export enum ChangePasswordActionTypes {
  ChangePasswordStart = '[Auth-ChangePassword] Change Password Start',
  ChangePasswordSuccess = '[Auth-ChangePassword] Change Password Success',
  ChangePasswordFailure = '[Auth-ChangePassword] Change Password Failure'
}

export class ChangePasswordStart implements Action {
  readonly type = ChangePasswordActionTypes.ChangePasswordStart;

  constructor(public payload: { options: auth0.ChangePasswordOptions }) {}
}

export class ChangePasswordSuccess implements Action {
  readonly type = ChangePasswordActionTypes.ChangePasswordSuccess;

  constructor(public payload: { response: string }) {}
}

export class ChangePasswordFailure implements Action {
  readonly type = ChangePasswordActionTypes.ChangePasswordFailure;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export type ChangePasswordAction =
  | ChangePasswordStart
  | ChangePasswordSuccess
  | ChangePasswordFailure;

export const fromChangePasswordActions = {
  ChangePasswordActionTypes,
  ChangePasswordStart,
  ChangePasswordSuccess,
  ChangePasswordFailure
};
