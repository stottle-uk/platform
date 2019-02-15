import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import * as SendBird from 'sendbird';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';
import { ChannelParticipantsListInnerComponent } from './components/channel-participants-list-inner.component';
import { GeniricListComponent } from './components/geniric-list.component';
import { MessagesListInnerComponent } from './components/messages-list-inner.component';
import { ReceievedInvitationsInnerComponent } from './components/receieved-invitations-inner.component';
import { ChannelParticipantsListComponent } from './containers/channel-participants-list.component';
import { CreateGroupChannelComponent } from './containers/create-group-channel.component';
import { CreateOpenChannelComponent } from './containers/create-open-channel.component';
import { DeleteMessageComponent } from './containers/delete-message.component';
import { EnterChannelComponent } from './containers/enter-channel.component';
import { FetchMoreMessagesComponent } from './containers/fetch-more-messages.component';
import { GroupChannelListComponent } from './containers/group-channel-list.component';
import { MessagesListComponent } from './containers/messages-list.component';
import { OpenChannelListComponent } from './containers/open-channel-list.component';
import { ReceievedInvitationsComponent } from './containers/receieved-invitations.component';
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
import { SendbirdChannelListItemComponent } from './templates/send-bird-channel-list-item.component';
import { SendbirdChannelParticipantsListItemComponent } from './templates/send-bird-channel-participants-list-item.component';
import { SendbirdCreateChannelFormComponent } from './templates/send-bird-create-channel-form.component';
import { SendbirdFetchMoreMessagesBtnComponent } from './templates/send-bird-fetch-more-messages-btn.component';
import { SendbirdMessageFileFormComponent } from './templates/send-bird-message-file-form.component';
import { SendBirdMessageFormComponent } from './templates/send-bird-message-form.component';
import { SendbirdMessagesListItemComponent } from './templates/send-bird-messages-list-item.component';
import { SendBirdReceievedInvitationsItemComponent } from './templates/send-bird-receieved-invitations-item.component';

export function sendBirdFactory(
  options: SendbirdOptions
): SendBird.SendBirdInstance {
  return new SendBird({ appId: options.appId });
}

const entryComponents = [
  SendbirdMessagesListItemComponent,
  SendBirdMessageFormComponent,
  SendbirdMessageFileFormComponent,
  SendbirdChannelListItemComponent,
  SendbirdChannelParticipantsListItemComponent,
  SendbirdFetchMoreMessagesBtnComponent,
  SendbirdCreateChannelFormComponent,
  SendBirdReceievedInvitationsItemComponent
];

const declarations = [
  OpenChannelListComponent,
  GroupChannelListComponent,
  MessagesListComponent,
  SendMessageComponent,
  SendFileMessageComponent,
  CreateOpenChannelComponent,
  CreateGroupChannelComponent,
  FetchMoreMessagesComponent,
  DeleteMessageComponent,
  ChannelParticipantsListComponent,
  EnterChannelComponent,
  ReceievedInvitationsComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    declarations,
    entryComponents,
    ChannelListInnerComponent,
    MessagesListInnerComponent,
    ChannelParticipantsListInnerComponent,
    ReceievedInvitationsInnerComponent,
    GeniricListComponent
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
