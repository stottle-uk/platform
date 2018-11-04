import { Component } from '@angular/core';

@Component({
  selector: 'stottle-blog',
  template: `
  <div class="content">
    <h2>Medium Articles</h2>
    <p >
      Articles I have written and published on <a href="https://medium.com/@stuarttottle/">medium.com</a>. 
      I write articles to confirm my understanding of a subject or technology and I hope others will find them useful.
    </p>
  </div>
  <mat-nav-list>
    <mat-divider></mat-divider>
    <a mat-list-item *ngFor="let item of blogItems" [href]="item.link" target="_blank">
      <mat-icon mat-list-icon>short_text</mat-icon>
      <h4 mat-line>
        {{item.name}}
      </h4>
      <p mat-line>{{item.description}}</p>
      <mat-divider></mat-divider>
    </a>
  </mat-nav-list>
  `,
  styles: []
})
export class BlogComponent {
  blogItems = [
    {
      name: 'Angular -  Authentication with Auth0 and NGRX',
      description:
        'My interpretation of how auth0 can be integrated with NGRX in an Angular Application..',
      link:
        'https://medium.com/@stuarttottle/angular-authentication-with-auth0-and-ngrx-e22228b04b3'
    },
    {
      name: 'Upload to Azure Blob Storage in Angular',
      description:
        'Upload to azure blob storage using microsofts azure javascript library with no server side code.',
      link:
        'https://medium.com/@stuarttottle/upload-to-azure-blob-storage-with-angular-7977e979496a'
    },
    {
      name: 'Securion Pay - Node.js backend example',
      description: 'Create subscriptions and take payments with securion pay.',
      link:
        'https://medium.com/@stuarttottle/securionpay-subscriptions-in-node-js-ff2c4521701f'
    },
    {
      name: 'Integration Testing Identity Server',
      description:
        'Create integration tests for a .net core web api probject that uses identity server 4.',
      link:
        'https://medium.com/comparethemarket/asp-net-core-2-0-integration-testing-with-identity-server-7f328c22d969'
    }
  ];
}
