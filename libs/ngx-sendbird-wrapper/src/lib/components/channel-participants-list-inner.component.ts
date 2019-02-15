import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GenericListOptions } from '../models/messages.model';
import { SendbirdChannelParticipantsListItemComponent } from '../templates/send-bird-channel-participants-list-item.component';

@Component({
  selector: 'stottle-channel-participants-list-inner',
  template: `
    <div class="channel-participants-container">
      <stottle-geniric-list [options]="options"></stottle-geniric-list>
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
      trackByKey: this.trackByFn,
      updateInstance: this.updateInstance.bind(this)
    };
  }

  private trackByFn(item: SendBird.User): string {
    return item.userId;
  }

  private updateInstance(
    instance: SendbirdChannelParticipantsListItemComponent,
    index: number
  ): void {
    instance.participant = this.participants[index];
  }
}
