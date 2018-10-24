import { Component } from '@angular/core';

@Component({
  selector: 'stottle-home',
  template: `
  <h2>This is the home component</h2>
  <a routerLink="/admin">Admin</a>
  `,
  styles: []
})
export class HomeComponent {}
