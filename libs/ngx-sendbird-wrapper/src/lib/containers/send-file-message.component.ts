import { Component, OnInit } from '@angular/core';
import { SendFileMessage } from '../models/messages.model';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-send-file-message',
  template: `
    <stottle-message-file-form
      (messageSubmit)="sendMessage($event)"
    ></stottle-message-file-form>
  `,
  styles: []
})
export class SendFileMessageComponent implements OnInit {
  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {}

  sendMessage(message: SendFileMessage): void {
    this.vs.sendFileMessage(message.file).subscribe();
  }
}
