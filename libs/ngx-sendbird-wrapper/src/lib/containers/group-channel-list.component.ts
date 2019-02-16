import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-group-channel-list',
  template: `
    <stottle-channel-list-inner
      [channels]="groupChannels$ | async"
    ></stottle-channel-list-inner>
  `,
  styles: []
})
export class GroupChannelListComponent implements OnInit, OnDestroy {
  groupChannels$ = this.vs.groupChannels$;

  private destroy$ = new Subject();

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit(): void {
    this.vs
      .getGroupChannels()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
