import { InjectionToken, Type } from '@angular/core';
import { SendbirdChannelParticipantsListItemComponent } from '../../channel-participants/templates';
import {
  SendbirdChannelListItemComponent,
  SendbirdCreateChannelFormComponent
} from '../../channels/templates';
import { SendBirdChannelFormComponent } from '../../channels/templates/send-bird-channel-form.component';
import {
  SendbirdFetchMoreMessagesBtnComponent,
  SendbirdMessageFileFormComponent,
  SendBirdMessageFormComponent,
  SendbirdMessagesListItemComponent
} from '../../coversations/templates';
import { SendbirdUsersListItemComponent } from '../../users/templates/send-bird-users-list-item.component';

export interface SendbirdOptions {
  appId: string;
}

export interface Dictionary<T> {
  [key: number]: T;
}

export interface PreviousListQueries<T> {
  [key: string]: T;
}

export interface GenericListOptionsItem<T, TComp> {
  item: T;
  component: Type<TComp>;
}

export interface GenericListOptions<T, TComp> {
  notifyOnChanges?: boolean;
  items: GenericListOptionsItem<T, TComp>[];
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
  usersListItemComponent?: Type<SendbirdUsersListItemComponent>;
  channelFormComponent?: Type<SendBirdChannelFormComponent>;
}

export const SEND_BIRD_OPTIONS = new InjectionToken<SendbirdOptions>(
  'SEND_BIRD_OPTIONS'
);

export const SEND_BIRD_DECLARATIONS = new InjectionToken<
  SendbirdOptionsDeclarations
>('SEND_BIRD_DECLARATIONS');
