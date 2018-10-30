import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthProviderService } from '@stottle-platform/auth0-rxjs';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { fromAuthenticationActions } from '../authentication';
import {
  Authorize,
  fromAuthorizationActions as fromActions,
  Logout
} from './authorization.actions';

@Injectable()
export class AuthorizationEffects {
  @Effect()
  handleAuthentication$: Observable<Action> = this.actions$.pipe(
    take(1),
    exhaustMap(() =>
      this.auth.handleAuthentication().pipe(
        map(
          auth =>
            new fromAuthenticationActions.UserIsAuthenticated({
              auth
            })
        ),
        catchError(error => of(new fromActions.AuthenticationError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  authorize$: Observable<void> = this.actions$.pipe(
    ofType<Authorize>(fromActions.AuthorizationActionTypes.Authorize),
    map(action => action.payload.options),
    map(options => this.auth.authorize(options))
  );

  @Effect({ dispatch: false })
  authorizeRedirectUrl$: Observable<string> = this.actions$.pipe(
    ofType<Authorize>(fromActions.AuthorizationActionTypes.Authorize),
    map(action => action.payload.redirectUrl),
    tap(redirectUrl => (this.auth.redirectUrl = redirectUrl))
  );

  @Effect({ dispatch: false })
  logout$: Observable<void> = this.actions$.pipe(
    ofType<Logout>(fromActions.AuthorizationActionTypes.Logout),
    map(() => this.auth.logout())
  );

  constructor(private actions$: Actions, private auth: AuthProviderService) {}
}
