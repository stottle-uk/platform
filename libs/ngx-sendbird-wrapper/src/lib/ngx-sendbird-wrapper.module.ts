import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import * as SendBird from 'sendbird';
import { ChannelParticipantsModule } from './channel-participants/channel-participants.module';
import { ChannelsModule } from './channels/channels.module';
import { ConnectionModule } from './connection/connection.module';
import { ConverstionsModule } from './coversations/conversations.module';
import { ReceievedInvitationsModule } from './receieved-invitations/receieved-invitations.module';
import { SendbirdChannelListItemComponent } from './templates/send-bird-channel-list-item.component';
import { SendbirdChannelParticipantsListItemComponent } from './templates/send-bird-channel-participants-list-item.component';
import { SendbirdCreateChannelFormComponent } from './templates/send-bird-create-channel-form.component';
import { SendBirdReceievedInvitationsItemComponent } from './templates/send-bird-receieved-invitations-item.component';
import { UsersModule } from './users/users.module';
import {
  SendbirdOptions,
  SendbirdOptionsDeclarations,
  SEND_BIRD_DECLARATIONS,
  SEND_BIRD_OPTIONS
} from './_shared/models/shared.models';
import { SendbirdComponentResolverService } from './_shared/services/sendbird-component-resolver.service';
import { SEND_BIRD } from './_shared/services/sendbird.service';

export function sendBirdFactory(
  options: SendbirdOptions
): SendBird.SendBirdInstance {
  return new SendBird({ appId: options.appId });
}

const entryComponents = [
  SendbirdChannelListItemComponent,
  SendbirdChannelParticipantsListItemComponent,
  SendbirdCreateChannelFormComponent,
  SendBirdReceievedInvitationsItemComponent
];

const modules = [
  ConnectionModule,
  UsersModule,
  ChannelsModule,
  ConverstionsModule,
  ChannelParticipantsModule,
  ReceievedInvitationsModule
];

@NgModule({
  imports: [CommonModule, ...modules],
  declarations: [entryComponents],
  exports: [...modules],
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
