import { Component } from '@angular/core';

@Component({
  selector: 'stottle-send-bird-channel-list-item',
  template: `
    <pre stottleEnterChannel [channel]="channel">{{ channel | json }}</pre>
  `
})
export class SendbirdChannelListItemComponent {
  channel: SendBird.OpenChannel;
}
