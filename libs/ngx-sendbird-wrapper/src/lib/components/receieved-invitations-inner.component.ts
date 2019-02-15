import { Component, Input } from '@angular/core';
import { GenericListOptions } from '../models/messages.model';
import { SendBirdReceievedInvitationsItemComponent } from '../templates/send-bird-receieved-invitations-item.component';

@Component({
  selector: 'stottle-receieved-invitations-inner',
  template: `
    <div class="receieved-invitations-container">
      <ng-container
        #invitationsList
        *ngFor="let invitation of invitations; trackBy: trackByFn"
      >
        <template #invitationsListItem></template>
      </ng-container>
    </div>
  `
})
export class ReceievedInvitationsInnerComponent {
  @Input()
  invitations: SendBird.GroupChannel[];

  get options(): GenericListOptions<
    SendBird.GroupChannel,
    SendBirdReceievedInvitationsItemComponent
  > {
    return {
      component: SendBirdReceievedInvitationsItemComponent,
      items: this.invitations,
      trackByKey: this.trackByFn,
      updateInstance: this.updateInstance.bind(this)
    };
  }

  private trackByFn(item: SendBird.GroupChannel): string {
    return item.url;
  }

  private updateInstance(
    instance: SendBirdReceievedInvitationsItemComponent,
    index: number
  ): void {
    instance.invitation = this.invitations[index];
  }
}
