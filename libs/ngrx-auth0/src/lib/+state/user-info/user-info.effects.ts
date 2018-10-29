import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthProviderService } from '@stottle-platform/auth0-rxjs';
import { UserIsAuthenticated } from 'dist/libs/ngrx-auth0';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromAuthenticationActions } from '../authentication';
import {
  fromUserInfoActions as fromActions,
  GetUserInfoStart
} from './user-info.actions';

@Injectable()
export class UserInfoEffects {
  @Effect()
  handleAuthenticationGetUserInfoStart$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<UserIsAuthenticated>(
      fromAuthenticationActions.AuthenticationActionTypes.UserIsAuthenticated
    ),
    map(() => new fromActions.GetUserInfoStart())
  );

  @Effect()
  getUserInfoStart$: Observable<Action> = this.actions$.pipe(
    ofType<GetUserInfoStart>(fromActions.UserInfoActionTypes.GetUserInfoStart),
    switchMap(() =>
      this.auth.getUserInfo().pipe(
        map(userInfo => new fromActions.GetUserInfoSuccess({ userInfo })),
        catchError(error => of(new fromActions.GetUserInfoFailure({ error })))
      )
    )
  );

  constructor(private actions$: Actions, private auth: AuthProviderService) {}
}
