import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  GenericListOptions,
  GenericListOptionsItem
} from '../../_shared/models/shared.models';
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

  get items(): GenericListOptionsItem<
    SendBird.User,
    SendbirdUsersListItemComponent
  >[] {
    return (
      this.users &&
      this.users.map(item => ({
        item,
        component: SendbirdUsersListItemComponent
      }))
    );
  }

  get options(): GenericListOptions<
    SendBird.User,
    SendbirdUsersListItemComponent
  > {
    return {
      key: 'users',
      items: this.items,
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
