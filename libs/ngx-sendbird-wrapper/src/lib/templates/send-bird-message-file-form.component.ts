import { Component, EventEmitter } from '@angular/core';
import { SendFileMessage } from '../coversations/models/convsersations.models';

@Component({
  selector: 'stottle-send-bird-message-file-form',
  template: `
    stottle-send-bird-message-file-form
  `
})
export class SendbirdMessageFileFormComponent {
  messageSubmit = new EventEmitter<SendFileMessage>();
}
