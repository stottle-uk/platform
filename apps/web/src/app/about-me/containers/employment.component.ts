import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEmploymentActions } from '../+state/employment/employment.actions';
import { EmploymentState } from '../+state/employment/employment.reducer';
import { employmentQuery } from '../+state/employment/employment.selectors';

@Component({
  selector: 'stottle-employment',
  template: `
  <stottle-employment-inner
    [employmentHistory]="employmentHistory$ | async"
  ></stottle-employment-inner>
  `,
  styles: []
})
export class EmploymentComponent implements OnInit {
  employmentHistory$ = this.store.select(employmentQuery.selectAllEmployment);
  constructor(private store: Store<EmploymentState>) {}

  ngOnInit() {
    this.store.dispatch(new fromEmploymentActions.GetEmploymentHistoryStart());
  }
}
