import { Component } from '@angular/core';
import { SendMessage } from '../models/messages.model';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-send-message',
  template: `
    <stottle-message-form
      (messageSubmit)="sendMessage($event)"
    ></stottle-message-form>
  `,
  styles: []
})
export class SendMessageComponent {
  constructor(private vs: SendbirdViewStateService) {}

  sendMessage(message: SendMessage): void {
    this.vs.sendMessage(message.caption).subscribe();
  }
}
