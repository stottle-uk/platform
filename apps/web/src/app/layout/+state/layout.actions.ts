import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSideNav = '[Layout] Open Side Nav',
  CloseSideNav = '[Layout] Close Side Nav'
}

export class OpenSideNav implements Action {
  readonly type = LayoutActionTypes.OpenSideNav;
}

export class CloseSideNav implements Action {
  readonly type = LayoutActionTypes.CloseSideNav;
}

export type LayoutAction = OpenSideNav | CloseSideNav;

export const fromLayoutActions = {
  OpenSideNav,
  CloseSideNav
};
