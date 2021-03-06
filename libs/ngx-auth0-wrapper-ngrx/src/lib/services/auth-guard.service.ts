import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthDatesService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable } from 'rxjs';
import { first, map, skipUntil, tap } from 'rxjs/operators';
import {
  authenticationQuery,
  authorizationQuery,
  AuthState,
  fromAuthorizationActions
} from '../+state';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private store: Store<AuthState>,
    private date: AuthDatesService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(authorizationQuery.selectIsAuthenticated(this.date.getTime())),
      map(accessToken => !!accessToken),
      skipUntil(
        this.store.pipe(
          select(authenticationQuery.selectAuthenticationStatusChecked),
          first(statusChecked => statusChecked)
        )
      ),
      tap(isAuthenticated =>
        this.showLoginFormIfNotAuthenticated(isAuthenticated, state)
      )
    );
  }

  private showLoginFormIfNotAuthenticated(
    isAuthenticated: boolean,
    state: RouterStateSnapshot
  ) {
    if (!isAuthenticated) {
      this.store.dispatch(
        new fromAuthorizationActions.Authorize({
          redirectUrl: state.url,
          options: {
            mode: 'signUp'
          }
        })
      );
    }
  }
}
