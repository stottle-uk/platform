import { Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-employment-inner',
  template: `
  <mat-nav-list>
    <mat-divider></mat-divider>
    <a mat-list-item *ngFor="let item of employmentHistory; let i = index" [routerLink]="item.id">
      <mat-icon mat-list-icon>work</mat-icon>
      <h4 mat-line>
        {{item.name}}
        <small>({{item.description}})</small>
      </h4>
      <p mat-line>{{item.jobTitle}}</p>
      <p mat-line>{{item.from}} - {{item.to}}</p>
      <mat-divider></mat-divider>
    </a>
  </mat-nav-list>
  `
})
export class EmploymentInnerComponent {
  @Input() employmentHistory: any[];
}
