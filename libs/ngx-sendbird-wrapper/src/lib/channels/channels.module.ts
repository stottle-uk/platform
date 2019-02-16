import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';
import { CreateGroupChannelComponent } from './containers/create-group-channel.component';
import { CreateOpenChannelComponent } from './containers/create-open-channel.component';
import { GroupChannelListComponent } from './containers/group-channel-list.component';
import { OpenChannelListComponent } from './containers/open-channel-list.component';
import { EnterChannelDirective } from './directives/enter-channel.directive';

const declarations = [
  EnterChannelDirective,
  OpenChannelListComponent,
  GroupChannelListComponent,
  CreateOpenChannelComponent,
  CreateGroupChannelComponent
];

@NgModule({
  imports: [SharedModule],
  declarations: [declarations, ChannelListInnerComponent],
  exports: [declarations, SharedModule] // TODo: remeove shared module export
})
export class ChannelsModule {}
