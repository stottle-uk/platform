import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { SignalrService } from '@stottle-platform/ngx-signalr-wrapper';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import {
  ConnectToRealtime,
  ConnectToRealtimeStart,
  ConnectToRealtimeSuccess,
  DisconnectFromRealtimeStart,
  fromRealtimeActions,
  RealtimeOnClose,
  RealtimeOnCloseWithError
} from './realtime.actions';
import { RealtimeState } from './realtime.reducer';
import { realtimeQuery } from './realtime.selectors';

@Injectable()
export class RealtimeEffects {
  @Effect()
  connectToRealtime$: Observable<Action> = this.actions$.pipe(
    ofType<ConnectToRealtime>(
      fromRealtimeActions.RealtimeActionTypes.ConnectToRealtime
    ),
    withLatestFrom(this.store.select(realtimeQuery.getIsConnecting)),
    filter(([_, isConnecting]) => !isConnecting),
    map(() => new fromRealtimeActions.ConnectToRealtimeStart())
  );

  @Effect()
  connectToRealtimeStart$: Observable<Action> = this.actions$.pipe(
    ofType<ConnectToRealtimeStart>(
      fromRealtimeActions.RealtimeActionTypes.ConnectToRealtimeStart
    ),
    withLatestFrom(this.store.select(realtimeQuery.getOptions)),
    map(([_, options]) => options),
    switchMap(options =>
      this.signalrService.start(options).pipe(
        map(() => new fromRealtimeActions.ConnectToRealtimeSuccess()),
        catchError(error =>
          of(new fromRealtimeActions.ConnectToRealtimeFailure({ error }))
        )
      )
    )
  );

  @Effect()
  connectToRealtimeSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<ConnectToRealtimeSuccess>(
      fromRealtimeActions.RealtimeActionTypes.ConnectToRealtimeSuccess
    ),
    switchMap(() =>
      this.signalrService.onClose().pipe(
        map(() => new fromRealtimeActions.RealtimeOnClose()),
        catchError(error =>
          of(new fromRealtimeActions.RealtimeOnCloseWithError({ error }))
        )
      )
    )
  );

  @Effect()
  disconnectFromRealtimeStart$: Observable<Action> = this.actions$.pipe(
    ofType<DisconnectFromRealtimeStart>(
      fromRealtimeActions.RealtimeActionTypes.DisconnectFromRealtimeStart
    ),
    switchMap(() =>
      this.signalrService.stop(false).pipe(
        map(() => new fromRealtimeActions.DisconnectFromRealtimeSuccess()),
        catchError(error =>
          of(new fromRealtimeActions.DisconnectFromRealtimeFailure({ error }))
        )
      )
    )
  );

  @Effect()
  reatimeOnClose$: Observable<Action> = this.actions$.pipe(
    ofType<RealtimeOnClose | RealtimeOnCloseWithError>(
      fromRealtimeActions.RealtimeActionTypes.RealtimeOnClose,
      fromRealtimeActions.RealtimeActionTypes.RealtimeOnCloseWithError
    ),
    withLatestFrom(this.store.select(realtimeQuery.getIsConnecting)),
    filter(([_, isConnecting]) => !isConnecting),
    withLatestFrom(this.store.select(realtimeQuery.getIsAutoReconnectEnabled)),
    filter(([[], autoReconnectEnabled]) => autoReconnectEnabled),
    map(() => new fromRealtimeActions.ConnectToRealtimeStart())
  );

  constructor(
    private actions$: Actions,
    private signalrService: SignalrService,
    private store: Store<RealtimeState>
  ) {}
}
