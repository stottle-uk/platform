import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthDatesService } from '@stottle-platform/auth0-rxjs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  authenticationQuery,
  AuthState,
  fromAuthenticationActions
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
      select(authenticationQuery.selectIsAuthenticated(this.date.getTime())),
      map(accessToken => !!accessToken),
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
        new fromAuthenticationActions.Authorize({
          redirectUrl: state.url,
          options: {
            mode: 'signUp'
          }
        })
      );
    }
  }
}
