import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  styles: [
    `
      .channel-participant-container {
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
      }

      .avatar-container {
        margin: 0 10px;
      }

      .img-avatar {
        width: 32px;
      }

      h3 {
        margin: 0;
      }

      img {
        height: auto;
        max-width: 100%;
        display: block;
        vertical-align: middle;
        border-style: none;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelParticipantsListItemComponent {
  @Input()
  participant: SendBird.User;

  get name(): string {
    return this.participant && this.participant.userId;
  }

  get profileImageUrl(): string {
    return this.participant && this.participant.profileUrl;
  }
}
