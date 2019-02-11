import { Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-channel-participants-list-inner',
  template: `
    <pre>
      {{ participants | json }}
    </pre
    >
  `
})
export class ChannelParticipantsListInnerComponent {
  @Input()
  participants: SendBird.User;
}
