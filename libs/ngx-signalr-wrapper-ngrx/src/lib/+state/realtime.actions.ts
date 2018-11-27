import { Action } from '@ngrx/store';
import { SignalrOptions } from '@stottle-platform/ngx-signalr-wrapper';

export enum RealtimeActionTypes {
  ConnectToRealtime = '[Realtime] Connect To Realtime',
  ConnectToRealtimeStart = '[Realtime] Connect To Realtime Start',
  ConnectToRealtimeSuccess = '[Realtime] Connect To Realtime Success',
  ConnectToRealtimeFailure = '[Realtime] Connect To Realtime Failure'
}

export class ConnectToRealtime implements Action {
  readonly type = RealtimeActionTypes.ConnectToRealtime;
}

export class ConnectToRealtimeStart implements Action {
  readonly type = RealtimeActionTypes.ConnectToRealtimeStart;

  constructor(public payload: { options: SignalrOptions }) {}
}

export class ConnectToRealtimeSuccess implements Action {
  readonly type = RealtimeActionTypes.ConnectToRealtimeSuccess;
}

export class ConnectToRealtimeFailure implements Action {
  readonly type = RealtimeActionTypes.ConnectToRealtimeFailure;

  constructor(public payload: { error: any }) {}
}

export type RealtimeAction =
  | ConnectToRealtime
  | ConnectToRealtimeStart
  | ConnectToRealtimeSuccess
  | ConnectToRealtimeFailure;

export const fromRealtimeActions = {
  RealtimeActionTypes,
  ConnectToRealtime,
  ConnectToRealtimeStart,
  ConnectToRealtimeSuccess,
  ConnectToRealtimeFailure
};
