import { InjectionToken, Type } from '@angular/core';
import { SendbirdChannelParticipantsListItemComponent } from '../../channel-participants/templates';
import {
  SendbirdChannelListItemComponent,
  SendbirdCreateChannelFormComponent
} from '../../channels/templates';
import {
  SendbirdFetchMoreMessagesBtnComponent,
  SendbirdMessageFileFormComponent,
  SendBirdMessageFormComponent,
  SendbirdMessagesListItemComponent
} from '../../coversations/templates';
import { SbUsersListItemComponent } from '../../users/templates/users-list-item.component';

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
  userListItemComponent?: Type<SbUsersListItemComponent>;
}

export const SEND_BIRD_OPTIONS = new InjectionToken<SendbirdOptions>(
  'SEND_BIRD_OPTIONS'
);

export const SEND_BIRD_DECLARATIONS = new InjectionToken<
  SendbirdOptionsDeclarations
>('SEND_BIRD_DECLARATIONS');

export interface PreviousListQueries<T> {
  [key: string]: T;
}
