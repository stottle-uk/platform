import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Component({
  selector: 'stottle-open-channel-list',
  template: `
    <stottle-channel-list-inner
      [channels]="openChannels$ | async"
      [notifyOnChanges]="notifyOnChanges$ | async"
      (changesNotified)="onChangesNotified()"
    ></stottle-channel-list-inner>
  `
})
export class OpenChannelListComponent implements OnInit, OnDestroy {
  openChannels$ = this.vs.openChannels$;
  notifyOnChanges$ = this.vs.notifyOnChanges$;

  private destroy$ = new Subject();

  constructor(private vs: ChannelsViewStateService) {}

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

  onChangesNotified(): void {
    this.vs.disableNotifyOnChanges();
  }
}
