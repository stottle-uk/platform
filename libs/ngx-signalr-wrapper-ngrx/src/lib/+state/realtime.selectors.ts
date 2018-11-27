import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignalrOptions } from '@stottle-platform/ngx-signalr-wrapper';
import { RealtimeState, REALTIME_FEATURE_KEY } from './realtime.reducer';

const getRealtimeState = createFeatureSelector<RealtimeState>(
  REALTIME_FEATURE_KEY
);

const getOptions = createSelector(
  getRealtimeState,
  (state: RealtimeState) => state.options
);

const getIsConnecting = createSelector(
  getRealtimeState,
  (state: RealtimeState) => state.isConnecting
);

const getIsConnected = createSelector(
  getRealtimeState,
  (state: RealtimeState) => state.isConnected
);

const getIsAutoReconnectEnabled = createSelector(
  getOptions,
  (options: SignalrOptions) => !!options && options.onCloseAutoReconnect
);

const getError = createSelector(
  getRealtimeState,
  (state: RealtimeState) => state.error
);

export const realtimeQuery = {
  getOptions,
  getIsConnecting,
  getIsConnected,
  getIsAutoReconnectEnabled,
  getError
};
