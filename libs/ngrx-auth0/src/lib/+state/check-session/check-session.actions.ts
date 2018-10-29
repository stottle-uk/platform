import { Action } from '@ngrx/store';
import { Authentication } from '../authentication/authentication.model';

export enum CheckSessionActionTypes {
  CheckSessionStart = '[Auth-CheckSession] Check Session Start',
  CheckSessionSuccess = '[Auth-CheckSession] Check Session Success',
  CheckSessionFailure = '[Auth-CheckSession] Check Session Failure',
  ScheduleSessionCheck = '[Auth-CheckSession] Schedule Session Check'
}

export class CheckSessionStart implements Action {
  readonly type = CheckSessionActionTypes.CheckSessionStart;
}

export class CheckSessionSuccess implements Action {
  readonly type = CheckSessionActionTypes.CheckSessionSuccess;

  constructor(public payload: { auth: Authentication }) {} // TODO create shared thing
}

export class CheckSessionFailure implements Action {
  readonly type = CheckSessionActionTypes.CheckSessionFailure;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export class ScheduleSessionCheck implements Action {
  readonly type = CheckSessionActionTypes.ScheduleSessionCheck;
}

export type CheckSessionAction =
  | CheckSessionStart
  | CheckSessionSuccess
  | CheckSessionFailure
  | ScheduleSessionCheck;

export const fromCheckSessionActions = {
  CheckSessionActionTypes,
  CheckSessionStart,
  CheckSessionSuccess,
  CheckSessionFailure,
  ScheduleSessionCheck
};
