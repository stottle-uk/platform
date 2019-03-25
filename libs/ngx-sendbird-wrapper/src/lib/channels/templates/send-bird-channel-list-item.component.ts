import { Component } from '@angular/core';

@Component({
  selector: 'stottle-send-bird-channel-list-item',
  template: `
    <pre>{{ channel | json }}</pre>
  `
})
export class SendbirdChannelListItemComponent {
  channel: SendBird.BaseChannel;
}
