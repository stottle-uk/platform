import { Component } from '@angular/core';

@Component({
  selector: 'stottle-send-bird-messages-list-item',
  template: `
    <pre>{{ message | json }}</pre>
  `
})
export class SendbirdMessagesListItemComponent {
  message: SendBird.UserMessage | SendBird.FileMessage;
}
