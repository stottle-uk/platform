import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

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

  constructor(private vs: ChannelsViewStateService) {}

  ngOnInit(): void {
    console.log('dsfds');

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
