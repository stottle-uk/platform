import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'stottle-side-nav-inner',
  template: `
    <mat-toolbar color="primary">Menu</mat-toolbar>
    <mat-nav-list>
      <a
        *ngFor="let item of menuItems"
        mat-list-item
        [routerLink]="item.link"
        (click)="itemSelected.emit()"
      >
        {{ item.name }}
      </a>

      <mat-divider></mat-divider>

      <a mat-list-item routerLink="/admin" (click)="itemSelected.emit()"
        >Admin</a
      >
    </mat-nav-list>
  `
})
export class SideNavInnerComponent {
  @Output() itemSelected = new EventEmitter();

  menuItems = [
    {
      link: '/',
      name: 'Home'
    },
    {
      link: '/about-me',
      name: 'About Me'
    },
    {
      link: '/blog',
      name: 'Blog'
    },
    {
      link: '/coding-katas',
      name: 'Coding Katas'
    },
    {
      link: '/chat',
      name: 'Chat'
    }
  ];
}
