import { NgModule } from '@angular/core';
import { NgxSendbirdWrapperModule } from '@stottle-platform/ngx-sendbird-wrapper';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutesModule } from './chat-routes.module';
import { ChannelListItemComponent } from './components/channel-list-item.component';
import { ChannelParticipantsListItemComponent } from './components/channel-participants-list-item.component';
import { ChatComponent } from './components/chat.component';
import { CreateChannelFormComponent } from './components/create-channel-form.component';
import { FetchMoreMessagesBtnComponent } from './components/fetch-more-messages-btn.component';
import { MessageFileFormComponent } from './components/message-file-form.component';
import { MessageFormComponent } from './components/message-form.component';
import { MessagesListItemComponent } from './components/messages-list-item.component';
import { UsersListItemComponent } from './components/users-list-item.component';

const declarations = [
  MessageFormComponent,
  MessageFileFormComponent,
  ChannelListItemComponent,
  ChannelParticipantsListItemComponent,
  FetchMoreMessagesBtnComponent,
  MessagesListItemComponent,
  CreateChannelFormComponent,
  UsersListItemComponent
];

@NgModule({
  imports: [
    SharedModule,
    NgxSendbirdWrapperModule.forFeature({
      messageFormComponent: MessageFormComponent,
      messageFileFormComponent: MessageFileFormComponent,
      channelListItemComponent: ChannelListItemComponent,
      channelParticipantsListItemComponent: ChannelParticipantsListItemComponent,
      fetchMoreMessagesBtnComponent: FetchMoreMessagesBtnComponent,
      messagesListItemComponent: MessagesListItemComponent,
      createChannelFormComponent: CreateChannelFormComponent,
      usersListItemComponent: UsersListItemComponent
    }),
    ChatRoutesModule
  ],
  declarations: [ChatComponent, declarations],
  entryComponents: [declarations]
})
export class ChatModule {}
