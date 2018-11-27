import { RealtimeAction, RealtimeActionTypes } from './realtime.actions';

export const REALTIME_FEATURE_KEY = 'realtime';

export interface RealtimeState {
  isConnected: boolean;
  error: any;
}

export interface RealtimePartialState {
  readonly [REALTIME_FEATURE_KEY]: RealtimeState;
}

export const initialState: RealtimeState = {
  isConnected: false,
  error: null
};

export function realtimeReducer(
  state: RealtimeState = initialState,
  action: RealtimeAction
): RealtimeState {
  switch (action.type) {
    case RealtimeActionTypes.ConnectToRealtimeSuccess: {
      return { ...state };
    }
  }
  return state;
}
