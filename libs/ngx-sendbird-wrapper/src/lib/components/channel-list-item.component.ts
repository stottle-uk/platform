import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-channel-list-item',
  template: `
    <div
      class="channel-container"
      fxLayout
      stottle-enter-channel
      [channel]="channel"
    >
      <div class="avatar-container">
        <img class="img-avatar" [src]="coverImageUrl" [alt]="name" />
      </div>
      <h3 fxFlex="grow">
        <span> {{ name }} </span>
      </h3>
    </div>
  `,
  styles: [
    `
      .channel-container {
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
export class ChannelListItemComponent {
  @Input()
  channel: SendBird.OpenChannel;

  get name(): string {
    return this.channel && this.channel.name;
  }

  get coverImageUrl(): string {
    return this.channel && this.channel.coverUrl;
  }
}
