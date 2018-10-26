import { Component } from '@angular/core';

@Component({
  selector: 'stottle-home-inner',
  template: `
  <h2>This is the home component</h2>
  
  <mat-card class="example-card">
    <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
    <mat-card-content>
      <p>
        The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
        bred for hunting.
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
    </mat-card-actions>
  </mat-card>

  `,
  styles: []
})
export class HomeInnerComponent {}
