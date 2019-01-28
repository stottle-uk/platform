import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as SendBird from 'sendbird';

@Component({
  selector: 'stottle-channel-list-inner',
  template: `
    <ul>
      <li
        *ngFor="let channel of channels"
        (click)="channelSelected.emit(channel)"
      >
        {{ channel | json }}
      </li>
    </ul>
  `,
  styles: []
})
export class ChannelListInnerComponent implements OnInit {
  @Input()
  channels: SendBird.OpenChannel[];
  @Output()
  channelSelected = new EventEmitter<SendBird.OpenChannel>();

  constructor() {}

  ngOnInit() {}
}
