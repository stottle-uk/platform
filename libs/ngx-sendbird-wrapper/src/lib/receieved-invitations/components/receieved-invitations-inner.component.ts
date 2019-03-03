import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  GenericListOptions,
  GenericListOptionsItem
} from '../../_shared/models/shared.models';
import { SendBirdReceievedInvitationsItemComponent } from '../templates';

@Component({
  selector: 'stottle-receieved-invitations-inner',
  template: `
    <div class="receieved-invitations-container">
      <stottle-generic-list [options]="options"></stottle-generic-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceievedInvitationsInnerComponent {
  @Input()
  invitations: SendBird.GroupChannel[];

  get items(): GenericListOptionsItem<
    SendBird.GroupChannel,
    SendBirdReceievedInvitationsItemComponent
  >[] {
    return (
      this.invitations &&
      this.invitations.map(item => ({
        item,
        component: SendBirdReceievedInvitationsItemComponent
      }))
    );
  }

  get options(): GenericListOptions<
    SendBird.GroupChannel,
    SendBirdReceievedInvitationsItemComponent
  > {
    return {
      components:
        this.invitations &&
        this.invitations.map(() => SendBirdReceievedInvitationsItemComponent),
      items: this.invitations,
      trackByKey: this.trackByKey,
      updateInstance: this.updateInstance.bind(this)
    };
  }

  private trackByKey(item: SendBird.GroupChannel): string {
    return item.url;
  }

  private updateInstance(
    instance: SendBirdReceievedInvitationsItemComponent,
    index: number
  ): void {
    instance.invitation = this.invitations[index];
  }
}
