import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as SendBird from 'sendbird';
import { GenericListOptions } from '../../models/messages.model';
import { SendbirdChannelListItemComponent } from '../../templates/send-bird-channel-list-item.component';

@Component({
  selector: 'stottle-channel-list-inner',
  template: `
    <div class="channels-container">
      <stottle-generic-list [options]="options"></stottle-generic-list>
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
      trackByKey: this.trackByKey,
      updateInstance: this.updateInstance.bind(this)
    };
  }

  private trackByKey(item: SendBird.OpenChannel): string {
    return item.url;
  }

  private updateInstance(
    instance: SendbirdChannelListItemComponent,
    index: number
  ): void {
    instance.channel = this.channels[index];
  }
}
