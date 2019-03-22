import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';
import { CreateGroupChannelComponent } from './containers/create-group-channel.component';
import { CreateOpenChannelComponent } from './containers/create-open-channel.component';
import { EditCurrentChannelComponent } from './containers/edit-current-channel.component';
import { GroupChannelListComponent } from './containers/group-channel-list.component';
import { OpenChannelListComponent } from './containers/open-channel-list.component';
import { EnterChannelDirective } from './directives/enter-channel.directive';
import { SendBirdChannelFormComponent } from './templates/send-bird-channel-form.component';
import { SendbirdChannelListItemComponent } from './templates/send-bird-channel-list-item.component';
import { SendbirdCreateChannelFormComponent } from './templates/send-bird-create-channel-form.component';

const entryComponents = [
  SendbirdChannelListItemComponent,
  SendbirdCreateChannelFormComponent,
  SendBirdChannelFormComponent
];

const declarations = [
  EnterChannelDirective,
  OpenChannelListComponent,
  GroupChannelListComponent,
  CreateOpenChannelComponent,
  CreateGroupChannelComponent,
  EditCurrentChannelComponent
];

@NgModule({
  imports: [SharedModule],
  declarations: [declarations, entryComponents, ChannelListInnerComponent],
  entryComponents: [entryComponents],
  exports: [declarations, SharedModule] // TODo: remeove shared module export
})
export class ChannelsModule {}
