import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employment } from '../+state/employment/employment.model';

@Component({
  selector: 'stottle-employment-item-inner',
  template: `
  <mat-toolbar color="accent">

    <button
      type="button"
      aria-label="Toggle sidenav"
      mat-icon-button
      (click)="back.emit()">
      <mat-icon aria-label="Side nav toggle icon">arrow_back</mat-icon>
    </button>

    <span fxFlex="100">{{name}}</span>

  </mat-toolbar>

  <div class="content">

    <mat-card>
      <mat-card-content>
        <h2>{{jobTitle}}</h2>
        <h3>{{description}}</h3>
        <h4>{{location}} <small>({{from}} - {{to}})</small></h4>
        <ul>
          <li *ngFor="let statement of statements">{{statement}}</li>
        </ul>
      </mat-card-content>
    </mat-card>

  </div>
  `
})
export class EmploymentItemInnerComponent {
  @Input() employmentHistoryItem: Employment;
  @Output() back = new EventEmitter();

  get name(): string {
    return this.employmentHistoryItem && this.employmentHistoryItem.name;
  }

  get jobTitle(): string {
    return this.employmentHistoryItem && this.employmentHistoryItem.jobTitle;
  }

  get location(): string {
    return this.employmentHistoryItem && this.employmentHistoryItem.location;
  }

  get description(): string {
    return this.employmentHistoryItem && this.employmentHistoryItem.description;
  }

  get from(): string {
    return this.employmentHistoryItem && this.employmentHistoryItem.from;
  }

  get to(): string {
    return this.employmentHistoryItem && this.employmentHistoryItem.to;
  }

  get statements(): string[] {
    return (
      this.employmentHistoryItem &&
      this.employmentHistoryItem.content.statements
    );
  }
}
