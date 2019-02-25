import { Component } from '@angular/core';

@Component({
  selector: 'stottle-send-bird-receieved-invitations-item',
  template: `
    <pre>{{ invitation | json }}</pre>
  `
})
export class SendBirdReceievedInvitationsItemComponent {
  invitation: SendBird.GroupChannel;
}
