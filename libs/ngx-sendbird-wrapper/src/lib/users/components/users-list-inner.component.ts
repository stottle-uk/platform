import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GenericListOptions } from '../../_shared/models/shared.models';
import { SendbirdUsersListItemComponent } from '../templates/send-bird-users-list-item.component';

@Component({
  selector: 'stottle-users-list-inner',
  template: `
    <div class="users-container">
      <stottle-generic-list [options]="options"></stottle-generic-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListInnerComponent {
  @Input()
  users: SendBird.User[];

  get options(): GenericListOptions<
    SendBird.User,
    SendbirdUsersListItemComponent
  > {
    return {
      component: SendbirdUsersListItemComponent,
      items: this.users,
      trackByKey: this.trackByKey,
      updateInstance: this.updateInstance.bind(this)
    };
  }

  private trackByKey(item: SendBird.User): string {
    return item.userId;
  }

  private updateInstance(
    instance: SendbirdUsersListItemComponent,
    index: number
  ): void {
    instance.user = this.users[index];
  }
}
