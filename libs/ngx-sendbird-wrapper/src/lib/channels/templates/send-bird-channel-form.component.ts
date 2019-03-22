import { Component, EventEmitter } from '@angular/core';
import { EditChannel } from '../models/channels.models';

@Component({
  selector: 'stottle-send-bird-channel-form',
  template: `
    send-bird-channel-form works!
  `
})
export class SendBirdChannelFormComponent {
  channel: SendBird.OpenChannel;
  channelSubmit = new EventEmitter<EditChannel>();
}
