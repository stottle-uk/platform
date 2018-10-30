import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  authorizationQuery,
  AuthState,
  fromAuthorizationActions
} from '@stottle-platform-internal/ngrx-auth0';
import { map } from 'rxjs/operators';

@Component({
  selector: 'stottle-container',
  template: `
  <stottle-container-inner
    [isAuthenticated]="isAuthenticated$ | async"
    [isHandset]="isHandset$ | async"
    (login)="onLogin()"
    (logout)="onLogout()">

    <ng-content></ng-content>

  </stottle-container-inner>
  `
})
export class ContainerComponent {
  isAuthenticated$ = this.store.pipe(
    select(authorizationQuery.selectIsAuthenticated(new Date().getTime()))
  );
  isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private store: Store<AuthState>,
    private breakpointObserver: BreakpointObserver
  ) {}

  onLogin(): void {
    this.store.dispatch(
      new fromAuthorizationActions.Authorize({
        redirectUrl: '/',
        options: {
          mode: 'login'
        }
      })
    );
  }

  onLogout(): void {
    this.store.dispatch(new fromAuthorizationActions.Logout());
  }
}
