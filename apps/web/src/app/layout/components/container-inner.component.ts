import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stottle-container-inner',
  template: `
  <mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      #drawer
      class="sidenav"
      fixedInViewport="true"
      [attr.role]="role"
      [mode]="mode"
      [opened]="opened">

      <stottle-side-nav></stottle-side-nav>

    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">

        <mat-toolbar-row>
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
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

      <ng-content></ng-content>

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
export class ContainerInnerComponent {
  @Input() isAuthenticated: boolean;
  @Input() isHandset: boolean;
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  title = 'stottle.uk';

  get mode(): string {
    return this.isHandset ? 'over' : 'side';
  }

  get role(): string {
    return this.isHandset ? 'dialog' : 'navigation';
  }

  get opened(): boolean {
    return !this.isHandset;
  }
}
