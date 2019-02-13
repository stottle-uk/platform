import { NgModule } from '@angular/core';
import { NgxSendbirdWrapperModule } from '@stottle-platform/ngx-sendbird-wrapper';
import { ChannelListItemComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/channel-list-item.component';
import { ChannelParticipantsListItemComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/channel-participants-list-item.component';
import { CreateChannelFormComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/create-channel-form.component';
import { FetchMoreMessagesBtnComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/fetch-more-messages-btn.component';
import { MessageFileFormComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/message-file-form.component';
import { MessagesListItemComponent } from 'libs/ngx-sendbird-wrapper/src/lib/components/messages-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutesModule } from './chat-routes.module';
import { ChatComponent } from './components/chat.component';
import { MessageFormComponent } from './components/message-form.component';

@NgModule({
  imports: [
    SharedModule,
    NgxSendbirdWrapperModule.forFeature({
      sendBirdMessageFormComponent: MessageFormComponent,
      messageFileFormComponent: MessageFileFormComponent,
      channelListItemComponent: ChannelListItemComponent,
      channelParticipantsListItemComponent: ChannelParticipantsListItemComponent,
      fetchMoreMessagesBtnComponent: FetchMoreMessagesBtnComponent,
      messagesListItemComponent: MessagesListItemComponent,
      createChannelFormComponent: CreateChannelFormComponent
    }),
    ChatRoutesModule
  ],
  declarations: [ChatComponent, MessageFormComponent],
  entryComponents: [MessageFormComponent]
})
export class ChatModule {}
