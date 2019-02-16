import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-channel-participants-list',
  template: `
    <stottle-channel-participants-list-inner
      [participants]="participants$ | async"
    ></stottle-channel-participants-list-inner>
  `
})
export class ChannelParticipantsListComponent implements OnInit, OnDestroy {
  participants$ = this.vs.currentChannelParticipants$;

  private destroy$ = new Subject();

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {
    this.vs
      .getChannelParticipants()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
