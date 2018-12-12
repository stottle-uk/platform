import { Component } from '@angular/core';

@Component({
  selector: 'stottle-coding-katas',
  template: `
  <div class="content">
    <h1>
      Coding Katas
    </h1>
    <p>
      Playground for katas and prototypes
    </p>
  </div>
  <mat-nav-list>
    <mat-divider></mat-divider>
    <a mat-list-item *ngFor="let kata of katas" [routerLink]="kata.link">
      <mat-icon mat-list-icon>short_text</mat-icon>
      <h4 mat-line>
        {{kata.name}}
      </h4>
      <mat-divider></mat-divider>
    </a>
  </mat-nav-list>
  `,
  styles: []
})
export class CodingKatasComponent {
  katas = [
    {
      name: 'Bowling Game',
      link: 'bowling-game'
    },
    {
      name: 'Manage Contacts',
      link: 'manage-contacts'
    }
  ];
}
