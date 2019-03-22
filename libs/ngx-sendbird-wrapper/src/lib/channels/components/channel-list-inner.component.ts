import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import * as SendBird from 'sendbird';
import {
  GenericListOptions,
  GenericListOptionsItem
} from '../../_shared/models/shared.models';
import { SendbirdChannelListItemComponent } from '../templates';

@Component({
  selector: 'stottle-channel-list-inner',
  template: `
    <div class="channels-container">
      <stottle-generic-list
        [options]="options"
        (changes)="changesNotified.emit()"
      ></stottle-generic-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelListInnerComponent {
  @Input()
  channels: SendBird.OpenChannel[];
  @Input()
  notifyOnChanges: boolean;
  @Output()
  changesNotified = new EventEmitter();

  get items(): GenericListOptionsItem<
    SendBird.OpenChannel,
    SendbirdChannelListItemComponent
  >[] {
    return (
      this.channels &&
      this.channels.map(item => ({
        item,
        component: SendbirdChannelListItemComponent
      }))
    );
  }

  get options(): GenericListOptions<
    SendBird.OpenChannel,
    SendbirdChannelListItemComponent
  > {
    return {
      notifyOnChanges: this.notifyOnChanges,
      items: this.items,
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
