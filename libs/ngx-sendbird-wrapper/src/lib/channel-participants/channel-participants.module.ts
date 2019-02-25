import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ChannelParticipantsListInnerComponent } from './components/channel-participants-list-inner.component';
import { ChannelParticipantsListComponent } from './containers/channel-participants-list.component';
import { SendbirdChannelParticipantsListItemComponent } from './templates/send-bird-channel-participants-list-item.component';

const entryComponents = [SendbirdChannelParticipantsListItemComponent];

const declarations = [ChannelParticipantsListComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [
    declarations,
    entryComponents,
    ChannelParticipantsListInnerComponent
  ],
  entryComponents: [entryComponents],
  exports: [declarations]
})
export class ChannelParticipantsModule {}
