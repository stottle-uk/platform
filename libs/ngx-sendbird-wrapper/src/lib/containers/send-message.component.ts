import { Component, OnInit } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-send-message',
  template: `
    <p (click)="sendMessage()">
      send-message works!
    </p>
  `,
  styles: []
})
export class SendMessageComponent implements OnInit {
  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {}

  sendMessage(): void {
    this.vs.sendMessage('a message!').subscribe();
  }
}
