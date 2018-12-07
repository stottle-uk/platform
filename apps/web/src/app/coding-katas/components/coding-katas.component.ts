import { Component, OnInit } from '@angular/core';

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
    <a routerLink="bowling-game">Bowling Game</a>
    <a routerLink="manage-contacts">Manage Contacts</a>

  </div>
  `,
  styles: []
})
export class CodingKatasComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
