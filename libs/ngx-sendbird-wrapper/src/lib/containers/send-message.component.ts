import { Component, OnInit } from '@angular/core';
import { SendMessage } from '../models/messages.model';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-send-message',
  template: `
    <stottle-message-form (messageSubmit)="sendMessage($event)">
      send-message works!
    </stottle-message-form>
  `,
  styles: []
})
export class SendMessageComponent implements OnInit {
  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {}

  sendMessage(sendMessage: SendMessage): void {
    this.vs.sendMessage(sendMessage.message).subscribe();
  }
}
