import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthProviderService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  AuthenticationSuccess,
  fromAuthorizationActions
} from '../authorization';
import {
  fromUserInfoActions as fromActions,
  GetUserInfoStart
} from './user-info.actions';

@Injectable()
export class UserInfoEffects {
  @Effect()
  authenticationSuccessGetUserInfoStart$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<AuthenticationSuccess>(
      fromAuthorizationActions.AuthorizationActionTypes.AuthenticationSuccess
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
