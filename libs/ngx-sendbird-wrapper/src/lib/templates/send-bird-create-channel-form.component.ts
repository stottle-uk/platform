import { Component, EventEmitter } from '@angular/core';
import { CreateChannel } from '../models/messages.model';

@Component({
  selector: 'stottle-create-channel-form',
  template: `
    stottle-create-channel-form
  `
})
export class SendbirdCreateChannelFormComponent {
  channelSubmit = new EventEmitter<CreateChannel>();
}
