import { Component } from '@angular/core';

@Component({
  selector: 'stottle-channel-participants-list-item',
  template: `
    stottle-channel-participants-list-item
  `
})
export class SendbirdChannelParticipantsListItemComponent {
  participant: SendBird.User;
}
