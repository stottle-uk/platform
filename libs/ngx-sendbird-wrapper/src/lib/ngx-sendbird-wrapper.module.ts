import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as SendBird from 'sendbird';
import { ChannelsModule } from './channels/channels.module';
import { ChannelParticipantsListInnerComponent } from './components/channel-participants-list-inner.component';
import { ReceievedInvitationsInnerComponent } from './components/receieved-invitations-inner.component';
import { ChannelParticipantsListComponent } from './containers/channel-participants-list.component';
import { ReceievedInvitationsComponent } from './containers/receieved-invitations.component';
import { ConverstionsModule } from './coversations/conversations.module';
import { SendbirdComponentResolverService } from './services/sendbird-component-resolver.service';
import { SendbirdViewStateService } from './services/sendbird-view-state.service';
import { SEND_BIRD } from './services/sendbird.service';
import { SendbirdChannelListItemComponent } from './templates/send-bird-channel-list-item.component';
import { SendbirdChannelParticipantsListItemComponent } from './templates/send-bird-channel-participants-list-item.component';
import { SendbirdCreateChannelFormComponent } from './templates/send-bird-create-channel-form.component';
import { SendbirdFetchMoreMessagesBtnComponent } from './templates/send-bird-fetch-more-messages-btn.component';
import { SendbirdMessageFileFormComponent } from './templates/send-bird-message-file-form.component';
import { SendBirdMessageFormComponent } from './templates/send-bird-message-form.component';
import { SendbirdMessagesListItemComponent } from './templates/send-bird-messages-list-item.component';
import { SendBirdReceievedInvitationsItemComponent } from './templates/send-bird-receieved-invitations-item.component';
import {
  SendbirdOptions,
  SendbirdOptionsDeclarations,
  SEND_BIRD_DECLARATIONS,
  SEND_BIRD_OPTIONS
} from './_shared/models/shared.models';

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
  ChannelParticipantsListComponent,
  ReceievedInvitationsComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChannelsModule,
    ConverstionsModule
  ],
  declarations: [
    declarations,
    entryComponents,
    ChannelParticipantsListInnerComponent,
    ReceievedInvitationsInnerComponent
  ],
  exports: [declarations, ChannelsModule, ConverstionsModule],
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
        SendbirdComponentResolverService,
        SendbirdViewStateService
      ]
    };
  }
}
