import { Component } from '@angular/core';

@Component({
  selector: 'stottle-channel-list-item',
  template: `
    stottle-channel-list-item
  `
})
export class SendbirdChannelListItemComponent {
  channel: SendBird.OpenChannel;
}
