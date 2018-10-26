import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'stottle-side-nav-inner',
  template: `
  <mat-toolbar color="primary">Menu</mat-toolbar>
  <mat-nav-list>
    <a *ngFor="let item of menuItems"
      mat-list-item
      [routerLink]="item.link"
      (click)="itemSelected.emit()">
      {{item.name}}
    </a>

    <mat-divider></mat-divider>

    <a mat-list-item routerLink="/admin" (click)="itemSelected.emit()">Admin</a>
  </mat-nav-list>
  `,
  styles: []
})
export class SideNavInnerComponent {
  @Output() itemSelected = new EventEmitter();

  menuItems = [
    {
      link: '/',
      name: 'Home'
    },
    {
      link: '/',
      name: 'About Me'
    },
    {
      link: '/',
      name: 'Blog'
    },
    {
      link: '/',
      name: 'Coding Katas'
    }
  ];
}
