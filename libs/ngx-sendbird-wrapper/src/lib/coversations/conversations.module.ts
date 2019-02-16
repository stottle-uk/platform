import { NgModule } from '@angular/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChannelsModule } from '../channels/channels.module';
import { SharedModule } from '../_shared/shared.module';
import { MessagesListInnerComponent } from './components/messages-list-inner.component';
import { MessagesListComponent } from './containers/messages-list.component';
import { SendFileMessageComponent } from './containers/send-file-message.component';
import { SendMessageComponent } from './containers/send-message.component';
import { DeleteMessageDirective } from './directives/delete-message.directive';
import { FetchMoreMessagesDirective } from './directives/fetch-more-messages.directive';

const declarations = [
  DeleteMessageDirective,
  FetchMoreMessagesDirective,
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
  declarations: [declarations, MessagesListInnerComponent],
  exports: [declarations]
})
export class ConverstionsModule {}
