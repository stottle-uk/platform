import { NgModule } from '@angular/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChannelsModule } from '../channels/channels.module';
import { SharedModule } from '../_shared/shared.module';
import { MessagesListInnerComponent } from './components/messages-list-inner.component';
import { MessagesListComponent } from './containers/messages-list.component';
import { SendFileMessageComponent } from './containers/send-file-message.component';
import { SendMessageComponent } from './containers/send-message.component';
import { UpdateMessageComponent } from './containers/update-message.component';
import { CanEditMessageDirective } from './directives/can-edit-message.directive';
import { DeleteMessageDirective } from './directives/delete-message.directive';
import { FetchMoreMessagesDirective } from './directives/fetch-more-messages.directive';
import { UpdateMessageDirective } from './directives/update-message.directive';
import { SendbirdFetchMoreMessagesBtnComponent } from './templates/send-bird-fetch-more-messages-btn.component';
import { SendbirdMessageFileFormComponent } from './templates/send-bird-message-file-form.component';
import { SendBirdMessageFormComponent } from './templates/send-bird-message-form.component';
import { SendbirdMessagesListItemComponent } from './templates/send-bird-messages-list-item.component';

const entryComponents = [
  SendbirdMessagesListItemComponent,
  SendBirdMessageFormComponent,
  SendbirdMessageFileFormComponent,
  SendbirdFetchMoreMessagesBtnComponent,
  UpdateMessageComponent
];

const declarations = [
  DeleteMessageDirective,
  FetchMoreMessagesDirective,
  UpdateMessageDirective,
  CanEditMessageDirective,
  MessagesListComponent,
  SendMessageComponent,
  SendFileMessageComponent
];

@NgModule({
  imports: [
    SharedModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot(),
    ChannelsModule
  ],
  declarations: [declarations, entryComponents, MessagesListInnerComponent],
  entryComponents: [entryComponents],
  exports: [declarations]
})
export class ConverstionsModule {}
