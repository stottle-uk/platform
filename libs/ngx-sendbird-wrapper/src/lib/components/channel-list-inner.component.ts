import { Component, Input } from '@angular/core';
import * as SendBird from 'sendbird';

@Component({
  selector: 'stottle-channel-list-inner',
  template: `
    <div
      *ngFor="let channel of channels"
      fxLayout
      stottle-enter-channel
      [channel]="channel"
      class="channel-container"
    >
      <div class="avatar-container">
        <img class="img-avatar" [src]="channel.coverUrl" [alt]="channel.name" />
      </div>
      <h3 fxFlex="grow">
        <span> {{ channel.name }} </span>
      </h3>
    </div>
  `,
  styles: [
    `
      .channel-container {
        border-bottom: 1px solid #ccc;
      }

      .avatar-container {
        margin: 0 10px;
      }

      .img-avatar {
        width: 32px;
      }

      h3 {
        margin: 0;
      }

      img {
        height: auto;
        max-width: 100%;
        display: block;
        vertical-align: middle;
        border-style: none;
      }
    `
  ]
})
export class ChannelListInnerComponent {
  @Input()
  channels: SendBird.OpenChannel[];
}
