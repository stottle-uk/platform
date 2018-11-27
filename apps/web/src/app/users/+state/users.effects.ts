import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import {
  AuthenticationError,
  AuthenticationSuccess,
  fromAuthorizationActions
} from '@stottle-platform/ngx-auth0-wrapper-ngrx';
import { fromRealtimeActions } from 'libs/ngx-signalr-wrapper-ngrx/src/lib/+state/realtime.actions';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as fromRouter from '../../router-client/store';
import {
  AuthenticationRedirect,
  ConnectToRealtimeService,
  fromUsersActions,
  LoadUsers,
  UsersActionTypes,
  UsersLoaded,
  UsersLoadError
} from './users.actions';
import { UsersPartialState } from './users.reducer';

@Injectable()
export class UsersEffects {
  @Effect()
  authenticationSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<AuthenticationSuccess>(
      fromAuthorizationActions.AuthorizationActionTypes.AuthenticationSuccess
    ),
    map(action => action.payload.auth),
    switchMap(auth => [
      new fromUsersActions.AuthenticationRedirect({ auth }),
      new fromUsersActions.ConnectToRealtimeService({ auth })
    ])
  );

  @Effect()
  authenticationErrorRedirectUser$: Observable<Action> = this.actions$.pipe(
    ofType<AuthenticationError>(
      fromAuthorizationActions.AuthorizationActionTypes.AuthenticationError
    ),
    map(
      () =>
        new fromRouter.Go({
          path: ['/']
        })
    )
  );

  //TODO: add AuthenticationSFailure to redirect to auth failure page

  @Effect()
  authenticationRedirect$: Observable<Action> = this.actions$.pipe(
    ofType<AuthenticationRedirect>(
      fromUsersActions.UsersActionTypes.AuthenticationRedirect
    ),
    map(action => action.payload.auth),
    map(auth => auth.redirectUrl),
    filter(redirectUrl => !!redirectUrl),
    map(
      redirectUrl =>
        new fromRouter.Go({
          path: [redirectUrl]
        })
    )
  );

  @Effect()
  connectToRealtimeService$: Observable<Action> = this.actions$.pipe(
    ofType<ConnectToRealtimeService>(
      fromUsersActions.UsersActionTypes.ConnectToRealtimeService
    ),
    map(action => action.payload.auth),
    map(
      auth =>
        new fromRealtimeActions.ConnectToRealtime({
          options: {
            url: 'https://localhost:44305/stottlehub/',
            onCloseAutoReconnect: true,
            options: {
              accessTokenFactory: () => auth.accessToken
            }
          }
        })
    )
  );

  @Effect()
  loadUsers$ = this.dataPersistence.fetch(UsersActionTypes.LoadUsers, {
    run: (action: LoadUsers, state: UsersPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...

      return new UsersLoaded([]);
    },

    onError: (action: LoadUsers, error) => {
      console.error('Error', error);
      return new UsersLoadError(error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<UsersPartialState>
  ) {}
}
