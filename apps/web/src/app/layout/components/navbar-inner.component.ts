import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stottle-navbar-inner',
  template: `
  <mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      #drawer
      class="sidenav"
      fixedInViewport="true"
      [attr.role]="role"
      [mode]="mode"
      [opened]="opened"
      (closedStart)="sideNavClosed()">
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
            (click)="tooooo()"
            *ngIf="isHandset">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span fxFlex="100" class="title">{{title}}</span>

          <button
            type="button"
            mat-icon-button
            (click)="login.emit()"
            *ngIf="!isAuthenticated">
            <mat-icon aria-label="Side nav toggle icon">person</mat-icon>
          </button>
          <button
            type="button"
            mat-icon-button
            (click)="logout.emit()"
            *ngIf="isAuthenticated">
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
export class NavbarInnerComponent {
  @Input() isAuthenticated: boolean;
  @Input() isHandset: boolean;
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  title = 'stottle.uk';
  isOpen = false;

  get mode(): string {
    return this.isHandset ? 'over' : 'side';
  }

  get role(): string {
    return this.isHandset ? 'dialog' : 'navigation';
  }

  get opened(): boolean {
    return !this.isHandset || this.isOpen;
  }

  tooooo(): void {
    this.isOpen = !this.isOpen;
  }

  sideNavClosed(): void {
    this.isOpen = false;
  }
}
