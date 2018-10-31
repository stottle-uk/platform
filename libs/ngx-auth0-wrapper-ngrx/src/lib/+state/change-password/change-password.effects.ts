import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthProviderService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ChangePasswordStart, fromChangePasswordActions as fromActions } from './change-password.actions';

@Injectable()
export class ChangePasswordEffects {
  @Effect()
  changePasswordStart$: Observable<Action> = this.actions$.pipe(
    ofType<ChangePasswordStart>(
      fromActions.ChangePasswordActionTypes.ChangePasswordStart
    ),
    map(action => action.payload.options),
    switchMap(options =>
      this.auth.changePassword(options).pipe(
        map(
          response =>
            new fromActions.ChangePasswordSuccess({
              response
            })
        ),
        catchError(error =>
          of(new fromActions.ChangePasswordFailure({ error }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private auth: AuthProviderService) {}
}
