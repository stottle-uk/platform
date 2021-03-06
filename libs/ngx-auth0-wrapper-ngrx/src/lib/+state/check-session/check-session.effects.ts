import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthProviderService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import {
  AuthenticationSuccess,
  fromAuthorizationActions
} from '../authorization';
import {
  CheckSessionFailure,
  CheckSessionStart,
  CheckSessionSuccess,
  fromCheckSessionActions as fromActions,
  ScheduleSessionCheck
} from './check-session.actions';

@Injectable()
export class CheckSessionEffects {
  @Effect()
  authenticationSuccessScheduleSessionCheck$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<AuthenticationSuccess>(
      fromAuthorizationActions.AuthorizationActionTypes.AuthenticationSuccess
    ),
    map(() => new fromActions.ScheduleSessionCheck())
  );

  @Effect()
  scheduleSessionCheck$: Observable<Action> = this.actions$.pipe(
    ofType<ScheduleSessionCheck>(
      fromActions.CheckSessionActionTypes.ScheduleSessionCheck
    ),
    switchMap(() =>
      this.auth
        .scheduleSessionCheck()
        .pipe(map(() => new fromActions.CheckSessionStart()))
    )
  );

  @Effect()
  checkSessionStart$: Observable<Action> = this.actions$.pipe(
    ofType<CheckSessionStart>(
      fromActions.CheckSessionActionTypes.CheckSessionStart
    ),
    exhaustMap(() =>
      this.auth.checkSession().pipe(
        map(auth => new fromActions.CheckSessionSuccess({ auth })),
        catchError(error => of(new fromActions.CheckSessionFailure({ error })))
      )
    )
  );

  @Effect()
  checkSessionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<CheckSessionSuccess>(
      fromActions.CheckSessionActionTypes.CheckSessionSuccess
    ),
    map(action => action.payload.auth),
    map(
      auth =>
        new fromAuthorizationActions.AuthenticationSuccess({
          auth
        })
    )
  );

  @Effect()
  checkSessionFailure$: Observable<Action> = this.actions$.pipe(
    ofType<CheckSessionFailure>(
      fromActions.CheckSessionActionTypes.CheckSessionFailure
    ),
    map(action => action.payload.error),
    map(
      error =>
        new fromAuthorizationActions.AuthenticationError({
          error
        })
    )
  );

  constructor(private actions$: Actions, private auth: AuthProviderService) {}
}
