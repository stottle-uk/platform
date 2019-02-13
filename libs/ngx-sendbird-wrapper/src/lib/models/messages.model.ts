import { InjectionToken, Type } from '@angular/core';
import { MessageFileFormComponent } from '../components/message-file-form.component';
import { MessageFormComponent } from '../components/message-form.component';

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
  messageFormComponent?: Type<MessageFormComponent>;
  messageFileFormComponent?: Type<MessageFileFormComponent>;
}

export const SEND_BIRD_OPTIONS = new InjectionToken<SendbirdOptions>(
  'SEND_BIRD_OPTIONS'
);
