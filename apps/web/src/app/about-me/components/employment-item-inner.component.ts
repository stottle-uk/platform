import { Component, Input } from '@angular/core';
import { Employment } from '../+state/employment/employment.model';

@Component({
  selector: 'stottle-employment-item-inner',
  template: `
  <pre>{{employmentHistoryItem | json}}</pre>
  `
})
export class EmploymentItemInnerComponent {
  @Input() employmentHistoryItem: Employment[];
}
