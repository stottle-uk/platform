import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export enum RouterActionTypes {
  RouterNavigation = 'ROUTER_NAVIGATION',
  Go = '[Router] Go',
  Back = '[Router] Back',
  Forward = '[Router] Forward'
}

export class RouterNavigation implements Action {
  readonly type = RouterActionTypes.RouterNavigation;

  constructor(
    public payload: {
      routerState: any;
    }
  ) {}
}

export class Go implements Action {
  readonly type = RouterActionTypes.Go;

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = RouterActionTypes.Back;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.Forward;
}

export type RouterActions = Go | Back | Forward;
