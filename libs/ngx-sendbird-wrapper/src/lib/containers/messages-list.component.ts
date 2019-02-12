import { Component, OnInit } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-messages-list',
  template: `
    <stottle-messages-list-inner
      [messages]="messages$ | async"
      [scrollToBottomEnabled]="scrollToBottomEnabled$ | async"
      [scrollPositionMaintainEnabled]="scrollPositionMaintainEnabled$ | async"
    ></stottle-messages-list-inner>
  `
})
export class MessagesListComponent implements OnInit {
  messages$ = this.vs.messagesForCurrentChannel$;
  scrollToBottomEnabled$ = this.vs.lastCallType$.pipe(
    this.isOfType(['add', 'get'])
  );
  scrollPositionMaintainEnabled$ = this.vs.lastCallType$.pipe(
    this.isOfType(['getMore'])
  );

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {
    this.vs.getMessagesForCurrentChannel().subscribe();
  }

  private isOfType(types: string[]): OperatorFunction<string, boolean> {
    return map(type => types.includes(type));
  }
}
