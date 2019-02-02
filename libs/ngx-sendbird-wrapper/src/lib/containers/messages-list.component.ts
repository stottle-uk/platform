import { Component, OnInit } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-messages-list',
  template: `
    <stottle-messages-list-inner [messages]="messages$ | async">
    </stottle-messages-list-inner>
  `,
  styles: []
})
export class MessagesListComponent implements OnInit {
  messages$ = this.vs.messagesForCurrentChannel$;

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {
    this.vs.getMessagesForCurrentChannel().subscribe();
  }
}
