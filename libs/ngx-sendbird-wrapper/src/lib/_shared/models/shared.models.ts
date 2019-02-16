import { InjectionToken, Type } from '@angular/core';
import {
  SendbirdChannelListItemComponent,
  SendbirdChannelParticipantsListItemComponent,
  SendbirdCreateChannelFormComponent,
  SendbirdFetchMoreMessagesBtnComponent,
  SendbirdMessageFileFormComponent,
  SendBirdMessageFormComponent,
  SendbirdMessagesListItemComponent
} from '../../templates';

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
  updateInstance?: (instance: TComp) => void;
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
