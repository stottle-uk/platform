import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ChannelParticipantsListInnerComponent } from './components/channel-participants-list-inner.component';
import { ChannelParticipantsListComponent } from './containers/channel-participants-list.component';

const declarations = [ChannelParticipantsListComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [declarations, ChannelParticipantsListInnerComponent],
  exports: [declarations]
})
export class ChannelParticipantsModule {}
