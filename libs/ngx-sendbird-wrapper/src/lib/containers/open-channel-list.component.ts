import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-open-channel-list',
  template: `
    <stottle-channel-list-inner
      [channels]="openChannels$ | async"
    ></stottle-channel-list-inner>
  `
})
export class OpenChannelListComponent implements OnInit, OnDestroy {
  openChannels$ = this.vs.openChannels$;

  private destroy$ = new Subject();

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit(): void {
    this.vs
      .getOpenChannels()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
