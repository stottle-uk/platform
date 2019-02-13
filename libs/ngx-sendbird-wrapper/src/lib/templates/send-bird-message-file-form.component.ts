import { Component, EventEmitter } from '@angular/core';
import { SendFileMessage } from '../models/messages.model';

@Component({
  selector: 'stottle-message-file-form',
  template: `
    stottle-message-file-form
  `
})
export class SendbirdMessageFileFormComponent {
  messageSubmit = new EventEmitter<SendFileMessage>();
}
