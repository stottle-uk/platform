import { Component } from '@angular/core';

@Component({
  selector: 'stottle-side-nav-inner',
  template: `
  <mat-toolbar color="primary">Menu</mat-toolbar>
  <mat-nav-list>
    <a mat-list-item href="#">Home</a>
    <a mat-list-item href="#">About Me</a>
    <a mat-list-item href="#">Blog</a>
    <a mat-list-item href="#">Coding Katas</a>
  </mat-nav-list>
  `,
  styles: []
})
export class SideNavInnerComponent {}
