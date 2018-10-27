import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stottle-coding-katas',
  template: `
    <p>
      coding-katas works!
    </p>
    <a routerLink="bowling-game">Bowling Game</a>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class CodingKatasComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
