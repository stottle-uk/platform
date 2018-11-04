import { Action } from '@ngrx/store';
import { Employment } from './employment.model';

export enum EmploymentActionTypes {
  GetEmploymentHistoryStart = '[Employment] Get Employment History Start',
  GetEmploymentHistorySuccess = '[Employment] Get Employment History Success',
  GetEmploymentHistoryError = '[Employment] Get Employment History Failure',
  GetEmploymentHistoryItemStart = '[Employment] Get Employment History Item Start',
  GetEmploymentHistoryItemSuccess = '[Employment] Get Employment History Item Success',
  GetEmploymentHistoryItemError = '[Employment] Get Employment History Item Failure'
}

export class GetEmploymentHistoryStart implements Action {
  readonly type = EmploymentActionTypes.GetEmploymentHistoryStart;
}

export class GetEmploymentHistorySuccess implements Action {
  readonly type = EmploymentActionTypes.GetEmploymentHistorySuccess;
  constructor(public payload: Employment[]) {}
}

export class GetEmploymentHistoryError implements Action {
  readonly type = EmploymentActionTypes.GetEmploymentHistoryError;
  constructor(public payload: any) {}
}

export class GetEmploymentHistoryItemStart implements Action {
  readonly type = EmploymentActionTypes.GetEmploymentHistoryItemStart;
  constructor(public payload: string) {}
}

export class GetEmploymentHistoryItemSuccess implements Action {
  readonly type = EmploymentActionTypes.GetEmploymentHistoryItemSuccess;
  constructor(public payload: Employment) {}
}

export class GetEmploymentHistoryItemError implements Action {
  readonly type = EmploymentActionTypes.GetEmploymentHistoryItemError;
  constructor(public payload: any) {}
}

export type EmploymentAction =
  | GetEmploymentHistoryStart
  | GetEmploymentHistorySuccess
  | GetEmploymentHistoryError
  | GetEmploymentHistoryItemStart
  | GetEmploymentHistoryItemSuccess
  | GetEmploymentHistoryItemError;

export const fromEmploymentActions = {
  GetEmploymentHistoryStart,
  GetEmploymentHistorySuccess,
  GetEmploymentHistoryError,
  GetEmploymentHistoryItemStart,
  GetEmploymentHistoryItemSuccess,
  GetEmploymentHistoryItemError
};
