import { InjectionToken, Type } from '@angular/core';
import { ChannelListItemComponent } from '../components/channel-list-item.component';
import { MessageFileFormComponent } from '../components/message-file-form.component';
import { MessageFormComponent } from '../components/message-form.component';

export type SendbirdOptionsDeclaration =
  | MessageFormComponent
  | MessageFileFormComponent
  | ChannelListItemComponent;

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
  declarations: Type<SendbirdOptionsDeclaration>[];
}

export const SEND_BIRD_OPTIONS = new InjectionToken<SendbirdOptions>(
  'SEND_BIRD_OPTIONS'
);
