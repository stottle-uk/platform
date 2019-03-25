import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'stottle-edit-channel',
  template: `
    <button stottleDeleteOpenChannel [callback]="deletedCallback">
      Delete Channel
    </button>
    <stottle-edit-current-channel></stottle-edit-current-channel>
  `
})
export class EditChannelComponent {
  constructor(private router: Router) {}

  deletedCallback = () => this.router.navigate(['chat']);
}
