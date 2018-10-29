import { Action } from '@ngrx/store';

export enum UserInfoActionTypes {
  GetUserInfoStart = '[Auth-UserInfo] Get User Info Start',
  GetUserInfoSuccess = '[Auth-UserInfo] Get User Info Success',
  GetUserInfoFailure = '[Auth-UserInfo] Get User Info Failure'
}

export class GetUserInfoStart implements Action {
  readonly type = UserInfoActionTypes.GetUserInfoStart;
}

export class GetUserInfoSuccess implements Action {
  readonly type = UserInfoActionTypes.GetUserInfoSuccess;

  constructor(public payload: { userInfo: auth0.Auth0UserProfile }) {}
}

export class GetUserInfoFailure implements Action {
  readonly type = UserInfoActionTypes.GetUserInfoFailure;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export type UserInfoAction =
  | GetUserInfoStart
  | GetUserInfoSuccess
  | GetUserInfoFailure;

export const fromUserInfoActions = {
  UserInfoActionTypes,
  GetUserInfoStart,
  GetUserInfoSuccess,
  GetUserInfoFailure
};
