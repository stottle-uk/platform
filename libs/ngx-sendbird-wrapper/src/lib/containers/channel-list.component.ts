import { Component, OnInit } from '@angular/core';
import { SendBirdService } from '../services/sendbird.service';

@Component({
  selector: 'stottle-channel-list',
  template: `
    <stottle-channel-list-inner
      [channels]="openChannels$ | async"
    ></stottle-channel-list-inner>
  `,
  styles: []
})
export class ChannelListComponent implements OnInit {
  openChannels$ = this.sb.getOpenChannels();

  constructor(private sb: SendBirdService) {}

  ngOnInit(): void {}
}
