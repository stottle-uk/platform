import { Component } from '@angular/core';

@Component({
  selector: 'stottle-send-bird-messages-update-list-item',
  template: `
    UPDATE!!!!!!!!!!!!!!!!!!!!!!!!
    <pre>{{ message | json }}</pre>
  `
})
export class SendbirdMessagesUpdateListItemComponent {
  message: SendBird.UserMessage | SendBird.FileMessage;
}
