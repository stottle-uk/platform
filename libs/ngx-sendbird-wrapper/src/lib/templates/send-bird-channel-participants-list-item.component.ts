import { Component } from '@angular/core';

@Component({
  selector: 'stottle-send-bird-channel-participants-list-item',
  template: `
    <pre>{{ participant | json }}</pre>
  `
})
export class SendbirdChannelParticipantsListItemComponent {
  participant: SendBird.User;
}
