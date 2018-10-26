import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@stottle-platform-internal/ngrx-auth0';
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
  isAuthenticated$ = this.store.select(
    fromAuth.selectIsAuthenticated(new Date().getTime())
  );
  isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private store: Store<fromAuth.State>,
    private breakpointObserver: BreakpointObserver
  ) {}

  onLogin(): void {
    this.store.dispatch(
      new fromAuth.Login({
        redirectUrl: '/',
        options: {
          mode: 'login'
        }
      })
    );
  }

  onLogout(): void {
    this.store.dispatch(new fromAuth.Logout());
  }
}
