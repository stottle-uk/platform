import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@stottle-platform-internal/ngrx-auth0';

@Component({
  selector: 'stottle-platform-root',
  template: `
  <div 
    class="content" 
    fxLayout="column" 
    fxFlexFill>
        
      <section fxFlex="50px" class="header">
        <div fxLayout="row">
          <h1>
            {{title}}
          </h1>
          <button type="button" (click)="login()" *ngIf="!(isAuthenticated$ | async)">login</button>
          <button type="button" (click)="logout()" *ngIf="(isAuthenticated$ | async)">logout</button>
        </div>
      </section>

      <main fxFlex="100" role="main" class="body">
        <router-outlet></router-outlet>
      </main>      
  </div>
  `
})
export class AppComponent implements OnInit {
  title = 'stottle-web';

  isAuthenticated$ = this.store.select(
    fromAuth.selectIsAuthenticated(new Date().getTime())
  );

  constructor(private store: Store<fromAuth.State>) {}

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
