import { Component, OnInit } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-open-channel-list',
  template: `
    <stottle-channel-list-inner
      [channels]="openChannels$ | async"
    ></stottle-channel-list-inner>
  `
})
export class OpenChannelListComponent implements OnInit {
  openChannels$ = this.vs.openChannels$;

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit(): void {
    this.vs.getOpenChannels().subscribe();
  }
}
