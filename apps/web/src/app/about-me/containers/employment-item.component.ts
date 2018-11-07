import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmploymentState } from '../+state/employment/employment.reducer';
import { employmentQuery } from '../+state/employment/employment.selectors';
import * as fromRouter from '../../router-client/store';

@Component({
  selector: 'stottle-employment-item',
  template: `
  <stottle-employment-item-inner
    [employmentHistoryItem]="employmentHistoryItem$ | async"
    (back)="onBack()"
  ></stottle-employment-item-inner>
  `,
  styles: []
})
export class EmploymentItemComponent {
  employmentHistoryItem$ = this.store.select(
    employmentQuery.selectSelectedEmployment
  );
  constructor(private store: Store<EmploymentState>) {}

  onBack(): void {
    this.store.dispatch(new fromRouter.Back());
  }
}
