import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SendbirdChannelParticipantsListItemComponent } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-channel-participants-list-item',
  template: `
    <div class="channel-participant-container" fxLayout>
      <div class="avatar-container">
        <img class="img-avatar" [src]="profileImageUrl" [alt]="name" />
      </div>
      <h3 fxFlex="grow">{{ name }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelParticipantsListItemComponent
  implements SendbirdChannelParticipantsListItemComponent {
  @Input()
  participant: SendBird.User;

  get name(): string {
    return this.participant && this.participant.userId;
  }

  get profileImageUrl(): string {
    return this.participant && this.participant.profileUrl;
  }
}
