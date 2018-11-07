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

  <pre>{{employmentHistoryItem | json}}</pre>
  `
})
export class EmploymentItemInnerComponent {
  @Input() employmentHistoryItem: Employment;
  @Output() back = new EventEmitter();

  get name(): string {
    return this.employmentHistoryItem && this.employmentHistoryItem.name;
  }
}
