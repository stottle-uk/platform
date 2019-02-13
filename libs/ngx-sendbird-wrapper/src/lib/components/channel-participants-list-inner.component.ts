import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-channel-participants-list-inner',
  template: `
    <div
      *ngFor="let participant of participants"
      fxLayout
      class="participant-container"
    >
      <div class="avatar-container">
        <img
          class="img-avatar"
          [src]="participant.profileUrl"
          [alt]="participant.userId"
        />
      </div>
      <h3 fxFlex="grow">{{ participant.userId }}</h3>
    </div>
  `,
  styles: [
    `
      .participant-container {
        border-bottom: 1px solid #ccc;
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
export class ChannelParticipantsListInnerComponent {
  @Input()
  participants: SendBird.User;
}
