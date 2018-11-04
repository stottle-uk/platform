import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmploymentState } from '../+state/employment/employment.reducer';

@Component({
  selector: 'stottle-about-me-page',
  template: `
  <stottle-about-me-page-inner
  ></stottle-about-me-page-inner>
  `
})
export class AboutMePageComponent implements OnInit {
  constructor(private store: Store<EmploymentState>) {}

  ngOnInit() {
    // this.store.dispatch(new fromEmploymentActions.GetEmploymentHistoryStart());
  }
}
