import { Component, EventEmitter } from '@angular/core';
import { CreateChannel } from '../models/channels.models';

@Component({
  selector: 'stottle-send-bird-create-channel-form',
  template: `
    stottle-send-bird-create-channel-form
  `
})
export class SendbirdCreateChannelFormComponent {
  channelSubmit = new EventEmitter<CreateChannel>();
}
