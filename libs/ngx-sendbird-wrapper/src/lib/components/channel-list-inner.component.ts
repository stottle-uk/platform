import { Component, Input, OnInit } from '@angular/core';
import * as SendBird from 'sendbird';

@Component({
  selector: 'stottle-channel-list-inner',
  template: `
    <ul>
      <li *ngFor="let channel of channels">{{ channel | json }}</li>
    </ul>
  `,
  styles: []
})
export class ChannelListInnerComponent implements OnInit {
  @Input()
  channels: SendBird.OpenChannel[];

  constructor() {}

  ngOnInit() {}
}
