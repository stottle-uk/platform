import { SignalrOptions } from '@stottle-platform/ngx-signalr-wrapper';
import { RealtimeAction, RealtimeActionTypes } from './realtime.actions';

export const REALTIME_FEATURE_KEY = 'realtime';

export interface RealtimeState {
  options: SignalrOptions;
  isConnecting: boolean;
  isConnected: boolean;
  error: any;
}

export interface RealtimePartialState {
  readonly [REALTIME_FEATURE_KEY]: RealtimeState;
}

export const initialState: RealtimeState = {
  options: null,
  isConnecting: false,
  isConnected: false,
  error: null
};

export function realtimeReducer(
  state: RealtimeState = initialState,
  action: RealtimeAction
): RealtimeState {
  switch (action.type) {
    case RealtimeActionTypes.ConnectToRealtime: {
      return {
        ...state,
        options: action.payload.options
      };
    }

    case RealtimeActionTypes.ConnectToRealtimeStart: {
      return {
        ...state,
        isConnecting: true
      };
    }

    case RealtimeActionTypes.ConnectToRealtimeSuccess: {
      return {
        ...state,
        isConnecting: false,
        isConnected: true
      };
    }

    case RealtimeActionTypes.RealtimeOnClose: {
      return {
        ...state,
        isConnected: false
      };
    }

    case RealtimeActionTypes.RealtimeOnCloseWithError:
    case RealtimeActionTypes.ConnectToRealtimeFailure: {
      return {
        ...state,
        isConnected: false,
        error: action.payload.error
      };
    }

    default:
      return state;
  }
}
