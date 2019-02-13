import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import * as SendBird from 'sendbird';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';
import { ChannelListItemComponent } from './components/channel-list-item.component';
import { ChannelParticipantsListInnerComponent } from './components/channel-participants-list-inner.component';
import { ChannelParticipantsListItemComponent } from './components/channel-participants-list-item.component';
import { CreateChannelFormComponent } from './components/create-channel-form.component';
import { FetchMoreMessagesBtnComponent } from './components/fetch-more-messages-btn.component';
import { MessageFileFormComponent } from './components/message-file-form.component';
import { MessagesListInnerComponent } from './components/messages-list-inner.component';
import { MessagesListItemComponent } from './components/messages-list-item.component';
import { SendBirdMessageFormComponent } from './components/send-bird-message-form.component';
import { ChannelListComponent } from './containers/channel-list.component';
import { ChannelParticipantsListComponent } from './containers/channel-participants-list.component';
import { CreateOpenChannelComponent } from './containers/create-open-channel.component';
import { DeleteMessageComponent } from './containers/delete-message.component';
import { EnterChannelComponent } from './containers/enter-channel.component';
import { FetchMoreMessagesComponent } from './containers/fetch-more-messages.component';
import { MessagesListComponent } from './containers/messages-list.component';
import { SendFileMessageComponent } from './containers/send-file-message.component';
import { SendMessageComponent } from './containers/send-message.component';
import {
  SendbirdOptions,
  SendbirdOptionsDeclarations,
  SEND_BIRD_DECLARATIONS,
  SEND_BIRD_OPTIONS
} from './models/messages.model';
import { SendbirdComponentResolverService } from './services/sendbird-component-resolver.service';
import { SEND_BIRD } from './services/sendbird.service';

export function sendBirdFactory(
  options: SendbirdOptions
): SendBird.SendBirdInstance {
  return new SendBird({ appId: options.appId });
}

const entryComponents = [
  MessagesListItemComponent,
  SendBirdMessageFormComponent,
  MessageFileFormComponent,
  ChannelListItemComponent,
  ChannelParticipantsListItemComponent,
  FetchMoreMessagesBtnComponent,
  CreateChannelFormComponent
];

const declarations = [
  ChannelListComponent,
  MessagesListComponent,
  SendMessageComponent,
  SendFileMessageComponent,
  CreateOpenChannelComponent,
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
    ScrollToModule.forRoot()
  ],
  declarations: [
    declarations,
    entryComponents,
    ChannelListInnerComponent,
    MessagesListInnerComponent,
    ChannelParticipantsListInnerComponent,
    EnterChannelComponent
  ],
  exports: [declarations],
  entryComponents: [entryComponents]
})
export class NgxSendbirdWrapperModule {
  static forRoot(
    sendbirdOptions: SendbirdOptions
  ): ModuleWithProviders<NgxSendbirdWrapperModule> {
    return {
      ngModule: NgxSendbirdWrapperModule,
      providers: [
        {
          provide: SEND_BIRD,
          useFactory: sendBirdFactory,
          deps: [SEND_BIRD_OPTIONS]
        },
        {
          provide: SEND_BIRD_OPTIONS,
          useValue: sendbirdOptions
        }
      ]
    };
  }

  static forFeature(
    declarations: SendbirdOptionsDeclarations
  ): ModuleWithProviders<NgxSendbirdWrapperModule> {
    return {
      ngModule: NgxSendbirdWrapperModule,
      providers: [
        {
          provide: SEND_BIRD_DECLARATIONS,
          useValue: declarations
        },
        SendbirdComponentResolverService
      ]
    };
  }
}
