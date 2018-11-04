import { Component } from '@angular/core';

@Component({
  selector: 'stottle-home-inner',
  template: `
  <div class="content">
    <h1>stottle.uk</h1>
    
    <div fxLayout="column" fxLayout.gt-sm="row" class="cards">
      <mat-card fxFlex="100" fxFlex.gt-sm="48"  fxFlexOffset.gt-sm="2" *ngFor="let card of cards" class="card-container">
        <img mat-card-image [src]="card.image" [alt]="card.imageAlt">
        <mat-card-content>
          <h2>{{card.title}}</h2>
          <p>
            {{card.content}}
          </p>
        </mat-card-content>
        <mat-divider></mat-divider>
        <mat-card-actions>
          <a mat-button [routerLink]="['/', card.button.link]">{{card.button.text}}</a>
        </mat-card-actions>
      </mat-card>
    </div>
  </div>
  `
})
export class HomeInnerComponent {
  cards = [
    {
      image: '/assets/home/about-me.jpg',
      imageAlt: 'About me',
      title: 'About Me',
      content:
        'My employment history along with technologies, languages and frameworks I use',
      button: {
        text: 'Go',
        link: 'about-me'
      }
    },
    {
      image: '/assets/home/blog.jpg',
      imageAlt: 'Blog',
      title: 'Blog',
      content: 'Articles I have written on medium',
      button: {
        text: 'Go',
        link: 'blog'
      }
    },
    {
      image: '/assets/home/coding-kata.jpg',
      imageAlt: 'Coding Kata',
      title: 'Coding Kata',
      content:
        "Coding examples using various kata's and npm packages I have created that are also used for this site",
      button: {
        text: 'Go',
        link: 'coding-katas'
      }
    }
  ];
}
