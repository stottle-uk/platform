import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperatorFunction, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-messages-list',
  template: `
    <stottle-messages-list-inner
      [messages]="messages$ | async"
      [scrollToBottomEnabled]="scrollToBottomEnabled$ | async"
      [scrollPositionMaintainEnabled]="scrollPositionMaintainEnabled$ | async"
      (scrolledUp)="onScrolledUp()"
    ></stottle-messages-list-inner>
  `
})
export class MessagesListComponent implements OnInit, OnDestroy {
  messages$ = this.vs.currentChannelMessages$;
  scrollToBottomEnabled$ = this.vs.lastCallType$.pipe(
    this.isOfType(['add', 'get'])
  );
  scrollPositionMaintainEnabled$ = this.vs.lastCallType$.pipe(
    this.isOfType(['getMore'])
  );

  private destroy$ = new Subject();

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {
    this.vs
      .getCurrentChannelMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onScrolledUp(): void {
    this.vs
      .getCurrentChannelMoreMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private isOfType(types: string[]): OperatorFunction<string, boolean> {
    return map(type => types.includes(type));
  }
}
