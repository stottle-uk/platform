import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  authenticationQuery,
  AuthState,
  fromAuthenticationActions
} from '../+state';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AuthState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store
      .select(authenticationQuery.selectIsAuthenticated(new Date().getTime()))
      .pipe(
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
        new fromAuthenticationActions.Login({
          redirectUrl: state.url,
          options: {
            mode: 'signUp'
          }
        })
      );
    }
  }
}
