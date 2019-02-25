import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SendbirdUsersListItemComponent } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-channel-list-item',
  template: `
    <div class="user-container" fxLayout>
      <div class="avatar-container">
        <img class="img-avatar" [src]="profileUrl" [alt]="name" />
      </div>
      <h3 fxFlex="grow">
        <span> {{ name }} </span>
      </h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListItemComponent implements SendbirdUsersListItemComponent {
  @Input()
  user: SendBird.User;

  get name(): string {
    return this.user && this.user.userId;
  }

  get profileUrl(): string {
    return this.user && this.user.profileUrl;
  }
}
