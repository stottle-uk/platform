import { InjectionToken, Type } from '@angular/core';
import { SendbirdChannelListItemComponent } from '../templates/send-bird-channel-list-item.component';
import { SendbirdChannelParticipantsListItemComponent } from '../templates/send-bird-channel-participants-list-item.component';
import { SendbirdCreateChannelFormComponent } from '../templates/send-bird-create-channel-form.component';
import { SendbirdFetchMoreMessagesBtnComponent } from '../templates/send-bird-fetch-more-messages-btn.component';
import { SendbirdMessageFileFormComponent } from '../templates/send-bird-message-file-form.component';
import { SendBirdMessageFormComponent } from '../templates/send-bird-message-form.component';
import { SendbirdMessagesListItemComponent } from '../templates/send-bird-messages-list-item.component';

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

export interface GenericListOptions<T, TComp> {
  items: T[];
  component: Type<TComp>;
  trackByKey: (item: T) => string | number;
  updateInstance: (instance: TComp, index: number) => void;
}

export interface GenericOptions<TComp> {
  component: Type<TComp>;
  updateInstance: (instance: TComp) => void;
}

export interface SendbirdOptionsDeclarations {
  messageFormComponent?: Type<SendBirdMessageFormComponent>;
  messageFileFormComponent?: Type<SendbirdMessageFileFormComponent>;
  channelListItemComponent?: Type<SendbirdChannelListItemComponent>;
  channelParticipantsListItemComponent?: Type<
    SendbirdChannelParticipantsListItemComponent
  >;
  fetchMoreMessagesBtnComponent?: Type<SendbirdFetchMoreMessagesBtnComponent>;
  messagesListItemComponent?: Type<SendbirdMessagesListItemComponent>;
  createChannelFormComponent?: Type<SendbirdCreateChannelFormComponent>;
}

export const SEND_BIRD_OPTIONS = new InjectionToken<SendbirdOptions>(
  'SEND_BIRD_OPTIONS'
);

export const SEND_BIRD_DECLARATIONS = new InjectionToken<
  SendbirdOptionsDeclarations
>('SEND_BIRD_DECLARATIONS');
