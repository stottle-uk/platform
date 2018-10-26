import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import * as fromAuth from '@stottle-platform-internal/ngrx-auth0';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import * as fromRouter from '../../router-client/store';
import {
  LoadUsers,
  UsersActionTypes,
  UsersLoaded,
  UsersLoadError
} from './users.actions';
import { UsersPartialState } from './users.reducer';

@Injectable()
export class UsersEffects {
  @Effect()
  userIsAuthenticatedRedirectUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromAuth.UserIsAuthenticated>(
      fromAuth.AuthActionTypes.UserIsAuthenticated
    ),
    map(action => action.payload.auth),
    filter(auth => !!auth.redirectUrl),
    take(1),
    map(
      auth =>
        new fromRouter.Go({
          path: [auth.redirectUrl]
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
