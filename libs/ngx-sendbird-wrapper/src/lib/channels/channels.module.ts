import { NgModule } from '@angular/core';
import { SEND_BIRD_DECLARATIONS } from '../models/messages.model';
import { SharedModule } from '../shared/shared.module';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';
import { CreateGroupChannelComponent } from './containers/create-group-channel.component';
import { CreateOpenChannelComponent } from './containers/create-open-channel.component';
import { GroupChannelListComponent } from './containers/group-channel-list.component';
import { OpenChannelListComponent } from './containers/open-channel-list.component';
import { ChannelsViewStateService } from './services/channels-view-state.services';

const declarations = [
  OpenChannelListComponent,
  GroupChannelListComponent,
  CreateOpenChannelComponent,
  CreateGroupChannelComponent
];

@NgModule({
  imports: [SharedModule],
  providers: [
    {
      provide: SEND_BIRD_DECLARATIONS,
      useValue: declarations
    },
    ChannelsViewStateService
  ],
  declarations: [declarations, ChannelListInnerComponent],
  exports: [declarations, SharedModule]
})
export class ChannelsModule {}
