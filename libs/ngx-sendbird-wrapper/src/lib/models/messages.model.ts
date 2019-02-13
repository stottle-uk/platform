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

export interface SendbirdOptionsDeclarations {
  sendBirdMessageFormComponent?: Type<SendBirdMessageFormComponent>;
  sendBirdMessageFileFormComponent?: Type<SendbirdMessageFileFormComponent>;
  sendBirdChannelListItemComponent?: Type<SendbirdChannelListItemComponent>;
  sendBirdChannelParticipantsListItemComponent?: Type<
    SendbirdChannelParticipantsListItemComponent
  >;
  sendBirdFetchMoreMessagesBtnComponent?: Type<
    SendbirdFetchMoreMessagesBtnComponent
  >;
  sendBirdMessagesListItemComponent?: Type<SendbirdMessagesListItemComponent>;
  sendBirdCreateChannelFormComponent?: Type<SendbirdCreateChannelFormComponent>;
}

export const SEND_BIRD_OPTIONS = new InjectionToken<SendbirdOptions>(
  'SEND_BIRD_OPTIONS'
);

export const SEND_BIRD_DECLARATIONS = new InjectionToken<
  SendbirdOptionsDeclarations
>('SEND_BIRD_DECLARATIONS');
