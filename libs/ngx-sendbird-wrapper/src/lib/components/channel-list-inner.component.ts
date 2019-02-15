import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as SendBird from 'sendbird';
import { GenericListOptions } from '../models/messages.model';
import { SendbirdChannelListItemComponent } from '../templates/send-bird-channel-list-item.component';

@Component({
  selector: 'stottle-channel-list-inner',
  template: `
    <div class="channels-container">
      <stottle-geniric-list [options]="options"></stottle-geniric-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelListInnerComponent {
  @Input()
  channels: SendBird.OpenChannel[];

  get options(): GenericListOptions<
    SendBird.OpenChannel,
    SendbirdChannelListItemComponent
  > {
    return {
      component: SendbirdChannelListItemComponent,
      items: this.channels,
      trackByKey: this.trackByFn,
      updateInstance: this.updateInstance.bind(this)
    };
  }

  private trackByFn(item: SendBird.OpenChannel): string {
    return item.url;
  }

  private updateInstance(
    instance: SendbirdChannelListItemComponent,
    index: number
  ): void {
    instance.channel = this.channels[index];
  }
}
