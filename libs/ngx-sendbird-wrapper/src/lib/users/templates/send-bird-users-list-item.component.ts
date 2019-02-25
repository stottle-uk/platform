import { Component } from '@angular/core';

@Component({
  selector: 'stottle-send-bird-users-list-item',
  template: `
    <pre>{{ user | json }}</pre>
  `
})
export class SendbirdUsersListItemComponent {
  user: SendBird.User;
}
