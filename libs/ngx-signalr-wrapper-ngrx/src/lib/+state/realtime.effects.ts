import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { SignalrService } from '@stottle-platform/ngx-signalr-wrapper';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  ConnectToRealtimeStart,
  fromRealtimeActions
} from './realtime.actions';
import { RealtimePartialState } from './realtime.reducer';

@Injectable()
export class RealtimeEffects {
  @Effect()
  connectToRealtimeStart$: Observable<Action> = this.actions$.pipe(
    ofType<ConnectToRealtimeStart>(
      fromRealtimeActions.RealtimeActionTypes.ConnectToRealtimeStart
    ),
    map(action => action.payload.options),
    switchMap(options =>
      this.signalrService.start(options).pipe(
        map(() => new fromRealtimeActions.ConnectToRealtimeSuccess()),
        catchError(error =>
          of(new fromRealtimeActions.ConnectToRealtimeFailure({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private signalrService: SignalrService,
    private dataPersistence: DataPersistence<RealtimePartialState>
  ) {}
}
