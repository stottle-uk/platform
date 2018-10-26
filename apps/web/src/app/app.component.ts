import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@stottle-platform-internal/ngrx-auth0';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'stottle-platform-root',
  template: `
  <mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      #drawer
      class="sidenav"
      fixedInViewport="true"
      [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
      [mode]="(isHandset$ | async) ? 'over' : 'side'"
      [opened]="!(isHandset$ | async)">
      <mat-toolbar color="primary">Menu</mat-toolbar>
      <mat-nav-list>
        <a mat-list-item href="#">Home</a>
        <a mat-list-item href="#">About Me</a>
        <a mat-list-item href="#">Blog</a>
        <a mat-list-item href="#">Link 3</a>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">

        <mat-toolbar-row>
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span fxFlex="100" class="title">{{title}}</span>

          <button
            type="button"
            mat-icon-button
            (click)="login()"
            *ngIf="!(isAuthenticated$ | async)">
            <mat-icon aria-label="Side nav toggle icon">person</mat-icon>
          </button>
          <button
            type="button"
            mat-icon-button
            (click)="logout()"
            *ngIf="(isAuthenticated$ | async)">
            <mat-icon aria-label="Side nav toggle icon">logout</mat-icon>
          </button>
        </mat-toolbar-row>

      </mat-toolbar>
      <!-- Add Content Here -->
      <router-outlet></router-outlet>

    </mat-sidenav-content>
  </mat-sidenav-container>

  `,
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
      }

      .title {
        text-align: center;
      }
    `
  ]
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
