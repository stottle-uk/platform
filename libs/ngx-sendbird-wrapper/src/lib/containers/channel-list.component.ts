import { Component, OnInit } from '@angular/core';
import * as SendBird from 'sendbird';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-channel-list',
  template: `
    <stottle-channel-list-inner
      [channels]="openChannels$ | async"
      (channelSelected)="onChannelSelected($event)"
    ></stottle-channel-list-inner>
  `,
  styles: []
})
export class ChannelListComponent implements OnInit {
  openChannels$ = this.vs.openChannels$;

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit(): void {
    this.vs.getOpenChannels().subscribe();
  }

  onChannelSelected(channel: SendBird.OpenChannel): void {
    this.vs.enterChannel(channel).subscribe(); // TODO: this should be in an attribute component
  }
}
