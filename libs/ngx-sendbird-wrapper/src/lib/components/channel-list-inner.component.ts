import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as SendBird from 'sendbird';

@Component({
  selector: 'stottle-channel-list-inner',
  template: `
    <mat-list>
      <mat-list-item
        *ngFor="let channel of channels"
        (click)="channelSelected.emit(channel)"
      >
        <img matListAvatar [src]="channel.coverUrl" [alt]="channel.name" />
        <p matLine>
          <span> {{ channel.name }} </span>
        </p>
      </mat-list-item>
    </mat-list>
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
