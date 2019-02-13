import { Component } from '@angular/core';

@Component({
  selector: 'stottle-send-bird-channel-list-item',
  template: `
    <pre stottle-enter-channel [channel]="channel">{{ channel | json }}</pre>
  `
})
export class SendbirdChannelListItemComponent {
  channel: SendBird.OpenChannel;
}
