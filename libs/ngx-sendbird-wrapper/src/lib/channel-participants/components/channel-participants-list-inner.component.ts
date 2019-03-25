import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  GenericListOptions,
  GenericListOptionsItem
} from '../../_shared/models/shared.models';
import { SendbirdChannelParticipantsListItemComponent } from '../templates';

@Component({
  selector: 'stottle-channel-participants-list-inner',
  template: `
    <div class="channel-participants-container">
      <stottle-generic-list [options]="options"></stottle-generic-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelParticipantsListInnerComponent {
  @Input()
  participants: SendBird.User[];

  get items(): GenericListOptionsItem<
    SendBird.User,
    SendbirdChannelParticipantsListItemComponent
  >[] {
    return (
      this.participants &&
      this.participants.map(item => ({
        item,
        component: SendbirdChannelParticipantsListItemComponent
      }))
    );
  }

  get options(): GenericListOptions<
    SendBird.User,
    SendbirdChannelParticipantsListItemComponent
  > {
    return {
      key: 'channelParticipants',
      items: this.items,
      trackByKey: this.trackByKey,
      updateInstance: this.updateInstance.bind(this)
    };
  }

  private trackByKey(item: SendBird.User): string {
    return item.userId;
  }

  private updateInstance(
    instance: SendbirdChannelParticipantsListItemComponent,
    index: number
  ): void {
    instance.participant = this.participants[index];
  }
}
