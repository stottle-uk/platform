import { Component, EventEmitter } from '@angular/core';
import { SendMessage } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-send-bird-message-form',
  template: `
    stottle-send-bird-message-form
  `
})
export class SendBirdMessageFormComponent {
  messageSubmit = new EventEmitter<SendMessage>();
}
