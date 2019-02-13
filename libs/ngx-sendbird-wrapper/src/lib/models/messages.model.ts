import { InjectionToken, Type } from '@angular/core';
import { ChannelListItemComponent } from '../components/channel-list-item.component';
import { ChannelParticipantsListItemComponent } from '../components/channel-participants-list-item.component';
import { CreateChannelFormComponent } from '../components/create-channel-form.component';
import { FetchMoreMessagesBtnComponent } from '../components/fetch-more-messages-btn.component';
import { MessageFileFormComponent } from '../components/message-file-form.component';
import { MessagesListItemComponent } from '../components/messages-list-item.component';
import { SendBirdMessageFormComponent } from '../components/send-bird-message-form.component';

export interface SendMessage {
  caption: string;
}

export interface CreateChannel {
  name: string;
}

export interface SendFileMessage {
  file: File;
}

export interface SendbirdOptions {
  appId: string;
}

export interface SendbirdOptionsDeclarations {
  sendBirdMessageFormComponent?: Type<SendBirdMessageFormComponent>;
  messageFileFormComponent: Type<MessageFileFormComponent>;
  channelListItemComponent: Type<ChannelListItemComponent>;
  channelParticipantsListItemComponent: Type<
    ChannelParticipantsListItemComponent
  >;
  fetchMoreMessagesBtnComponent: Type<FetchMoreMessagesBtnComponent>;
  messagesListItemComponent: Type<MessagesListItemComponent>;
  createChannelFormComponent: Type<CreateChannelFormComponent>;
}

export const SEND_BIRD_OPTIONS = new InjectionToken<SendbirdOptions>(
  'SEND_BIRD_OPTIONS'
);

export const SEND_BIRD_DECLARATIONS = new InjectionToken<
  SendbirdOptionsDeclarations
>('SEND_BIRD_DECLARATIONS');
