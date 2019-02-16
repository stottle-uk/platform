import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SendbirdChannelParticipantsListItemComponent } from '../templates/send-bird-channel-participants-list-item.component';
import { GenericListOptions } from '../_shared/models/shared.models';

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

  get options(): GenericListOptions<
    SendBird.User,
    SendbirdChannelParticipantsListItemComponent
  > {
    return {
      component: SendbirdChannelParticipantsListItemComponent,
      items: this.participants,
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
