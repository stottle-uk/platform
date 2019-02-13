import { Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-messages-list-item',
  template: `
    stottle-messages-list-item
  `
})
export class SendbirdMessagesListItemComponent {
  @Input() message: SendBird.UserMessage | SendBird.FileMessage;
}
