import { Component, EventEmitter } from '@angular/core';
import { SendFileMessage } from '../models/messages.model';

@Component({
  selector: 'stottle-send-bird-message-file-form',
  template: `
    stottle-send-bird-message-file-form
  `
})
export class SendbirdMessageFileFormComponent {
  messageSubmit = new EventEmitter<SendFileMessage>();
}
