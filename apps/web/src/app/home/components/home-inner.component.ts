import { Component } from '@angular/core';

@Component({
  selector: 'stottle-home-inner',
  template: `
  <h2>This is the home component</h2>
  
  <mat-card *ngFor="let card of cards" class="card-container">
    <img mat-card-image [src]="card.image" [alt]="card.imageAlt">
    <mat-card-content>
      <h2>{{card.title}}</h2>
      <p>
        {{card.content}}
      </p>
    </mat-card-content>
    <mat-divider></mat-divider>
    <mat-card-actions>
      <a mat-button routerLink="/">{{card.buttonText}}</a>
    </mat-card-actions>
  </mat-card>

  `,
  styles: [
    `
      .card-container {
        margin-bottom: 20px;
      }
    `
  ]
})
export class HomeInnerComponent {
  cards = [
    {
      image: '/assets/home/about-me.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      title: 'About Me',
      content: 'I am a....',
      buttonText: 'Go'
    },
    {
      image: '/assets/home/blog.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      title: 'Blog',
      content: 'I am a....',
      buttonText: 'Go'
    },
    {
      image: '/assets/home/coding-kata.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      title: 'Coding Kata',
      content: 'I am a....',
      buttonText: 'Go'
    }
  ];
}
