import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import * as SendBird from 'sendbird';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';
import { ChannelParticipantsListInnerComponent } from './components/channel-participants-list-inner.component';
import { MessageFileFormComponent } from './components/message-file-form.component';
import { MessageFormComponent } from './components/message-form.component';
import { MessageListItemComponent } from './components/message-list-item.component';
import { MessagesListInnerComponent } from './components/messages-list-inner.component';
import { AddOpenChannelComponent } from './containers/add-open-channel.component';
import { ChannelListComponent } from './containers/channel-list.component';
import { ChannelParticipantsListComponent } from './containers/channel-participants-list.component';
import { DeleteMessageComponent } from './containers/delete-message.component';
import { FetchMoreMessagesComponent } from './containers/fetch-more-messages.component';
import { MessagesListComponent } from './containers/messages-list.component';
import { SendFileMessageComponent } from './containers/send-file-message.component';
import { SendMessageComponent } from './containers/send-message.component';
import { SEND_BIRD } from './services/sendbird.service';

export function sendBirdFactory(): SendBird.SendBirdInstance {
  return new SendBird({ appId: 'DE368CF8-F364-498C-A481-554B90C33D4A' });
}

const declarations = [
  ChannelListComponent,
  MessagesListComponent,
  SendMessageComponent,
  SendFileMessageComponent,
  AddOpenChannelComponent,
  FetchMoreMessagesComponent,
  DeleteMessageComponent,
  ChannelParticipantsListComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    MatListModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    declarations,
    ChannelListInnerComponent,
    MessagesListInnerComponent,
    MessageFormComponent,
    MessageFileFormComponent,
    MessageListItemComponent,
    ChannelParticipantsListInnerComponent
  ],
  exports: [declarations]
})
export class NgxSendbirdWrapperModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSendbirdWrapperModule,
      providers: [
        {
          provide: SEND_BIRD,
          useFactory: sendBirdFactory
        }
      ]
    };
  }
}
