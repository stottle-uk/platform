import { Component } from '@angular/core';

@Component({
  selector: 'stottle-side-nav-inner',
  template: `
  <mat-toolbar color="primary">Menu</mat-toolbar>
  <mat-nav-list>
    <a mat-list-item routerLink="/">Home</a>
    <a mat-list-item routerLink="/">About Me</a>
    <a mat-list-item routerLink="/">Blog</a>
    <a mat-list-item routerLink="/">Coding Katas</a>

    <mat-divider></mat-divider>

    <a mat-list-item routerLink="/admin">Admin</a>
  </mat-nav-list>
  `,
  styles: []
})
export class SideNavInnerComponent {}
