import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { UsersListInnerComponent } from './components/users-list-inner.component';
import { UsersListComponent } from './containers/users-list.component';
import { SbUsersListItemComponent } from './templates/users-list-item.component';

const entryComponents = [SbUsersListItemComponent];

const declarations = [...entryComponents, UsersListComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [declarations, UsersListInnerComponent],
  entryComponents: [entryComponents],
  exports: [declarations]
})
export class UsersModule {}
