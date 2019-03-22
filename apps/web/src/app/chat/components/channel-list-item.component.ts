import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SendbirdChannelListItemComponent } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-channel-list-item',
  template: `
    <div class="channel-container" fxLayout>
      <div class="avatar-container">
        <img class="img-avatar" [src]="coverImageUrl" [alt]="name" />
      </div>
      <h3 fxFlex="grow">
        <a [routerLink]="channelUrl">
          <span> {{ name }} </span>
        </a>
      </h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelListItemComponent
  implements SendbirdChannelListItemComponent {
  @Input()
  channel: SendBird.OpenChannel;

  get name(): string {
    return this.channel && this.channel.name;
  }

  get channelUrl(): string {
    return this.channel && this.channel.url;
  }

  get coverImageUrl(): string {
    return this.channel && this.channel.coverUrl;
  }
}
