import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';
import { SendBirdService } from '../services/sendbird.service';

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
  openChannels$ = this.sb.getOpenChannels();

  constructor(
    private sb: SendBirdService,
    private vs: SendbirdViewStateService
  ) {}

  ngOnInit(): void {}

  onChannelSelected(channel: SendBird.OpenChannel): void {
    this.sb
      .enterChannel(channel)
      .pipe(tap(() => this.vs.setCurrentChannel(channel)))
      .subscribe(); // TODO: this should be in an attribute component
  }
}
