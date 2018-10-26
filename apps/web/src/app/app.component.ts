import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@stottle-platform-internal/ngrx-auth0';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'stottle-platform-root',
  template: `
  <stottle-navbar></stottle-navbar>

  `
})
export class AppComponent implements OnInit {
  title = 'stottle.uk';

  isAuthenticated$ = this.store.select(
    fromAuth.selectIsAuthenticated(new Date().getTime())
  );

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private store: Store<fromAuth.State>,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new fromAuth.CheckAuthenticationStatus());
  }

  login(): void {
    this.store.dispatch(
      new fromAuth.Login({
        redirectUrl: '/',
        options: {
          mode: 'login'
        }
      })
    );
  }

  logout(): void {
    this.store.dispatch(new fromAuth.Logout());
  }
}
