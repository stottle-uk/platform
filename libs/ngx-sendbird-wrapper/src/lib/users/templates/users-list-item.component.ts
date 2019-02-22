import { Component } from '@angular/core';

@Component({
  selector: 'stottle-users-list-item',
  template: `
    <pre>{{ user | json }}</pre>
  `
})
export class SbUsersListItemComponent {
  user: SendBird.User;
}
