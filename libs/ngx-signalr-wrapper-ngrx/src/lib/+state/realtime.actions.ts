import { Action } from '@ngrx/store';
import { SignalrOptions } from '@stottle-platform/ngx-signalr-wrapper';

export enum RealtimeActionTypes {
  ConnectToRealtime = '[Realtime] Connect To Realtime',
  ConnectToRealtimeStart = '[Realtime] Connect To Realtime Start',
  ConnectToRealtimeSuccess = '[Realtime] Connect To Realtime Success',
  ConnectToRealtimeFailure = '[Realtime] Connect To Realtime Failure',
  DisconnectFromRealtimeStart = '[Realtime] Disconnect From Realtime Start',
  DisconnectFromRealtimeSuccess = '[Realtime] Disconnect From Realtime Success',
  DisconnectFromRealtimeFailure = '[Realtime] Disconnect From Realtime Failure',
  RealtimeOnClose = '[Realtime] Realtime On Close',
  RealtimeOnCloseWithError = '[Realtime] Realtime On Close With Error'
}

export class ConnectToRealtime implements Action {
  readonly type = RealtimeActionTypes.ConnectToRealtime;

  constructor(public payload: { options: SignalrOptions }) {}
}

export class ConnectToRealtimeStart implements Action {
  readonly type = RealtimeActionTypes.ConnectToRealtimeStart;
}

export class ConnectToRealtimeSuccess implements Action {
  readonly type = RealtimeActionTypes.ConnectToRealtimeSuccess;
}

export class ConnectToRealtimeFailure implements Action {
  readonly type = RealtimeActionTypes.ConnectToRealtimeFailure;

  constructor(public payload: { error: any }) {}
}

export class DisconnectFromRealtimeStart implements Action {
  readonly type = RealtimeActionTypes.DisconnectFromRealtimeStart;
}

export class DisconnectFromRealtimeSuccess implements Action {
  readonly type = RealtimeActionTypes.DisconnectFromRealtimeSuccess;
}

export class DisconnectFromRealtimeFailure implements Action {
  readonly type = RealtimeActionTypes.DisconnectFromRealtimeFailure;

  constructor(public payload: { error: any }) {}
}

export class RealtimeOnClose implements Action {
  readonly type = RealtimeActionTypes.RealtimeOnClose;
}

export class RealtimeOnCloseWithError implements Action {
  readonly type = RealtimeActionTypes.RealtimeOnCloseWithError;

  constructor(public payload: { error: Error }) {}
}

export type RealtimeAction =
  | ConnectToRealtime
  | ConnectToRealtimeStart
  | ConnectToRealtimeSuccess
  | ConnectToRealtimeFailure
  | DisconnectFromRealtimeStart
  | DisconnectFromRealtimeSuccess
  | DisconnectFromRealtimeFailure
  | RealtimeOnClose
  | RealtimeOnCloseWithError;

export const fromRealtimeActions = {
  RealtimeActionTypes,
  ConnectToRealtime,
  ConnectToRealtimeStart,
  ConnectToRealtimeSuccess,
  ConnectToRealtimeFailure,
  DisconnectFromRealtimeStart,
  DisconnectFromRealtimeSuccess,
  DisconnectFromRealtimeFailure,
  RealtimeOnClose,
  RealtimeOnCloseWithError
};
