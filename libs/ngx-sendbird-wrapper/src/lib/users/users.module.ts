import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { UsersListInnerComponent } from './components/users-list-inner.component';
import { UsersListComponent } from './containers/users-list.component';
import { SendbirdUsersListItemComponent } from './templates/send-bird-users-list-item.component';

const entryComponents = [SendbirdUsersListItemComponent];

const declarations = [...entryComponents, UsersListComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [declarations, UsersListInnerComponent],
  entryComponents: [entryComponents],
  exports: [declarations]
})
export class UsersModule {}
