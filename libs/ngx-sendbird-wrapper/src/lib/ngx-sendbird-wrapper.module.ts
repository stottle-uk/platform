import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import * as SendBird from 'sendbird';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';
import { MessageFormComponent } from './components/message-form.component';
import { MessagesListInnerComponent } from './components/messages-list-inner.component';
import { AddOpenChannelComponent } from './containers/add-open-channel.component';
import { ChannelListComponent } from './containers/channel-list.component';
import { MessagesListComponent } from './containers/messages-list.component';
import { SendMessageComponent } from './containers/send-message.component';
import { SEND_BIRD } from './services/sendbird.service';

export function sendBirdFactory(): SendBird.SendBirdInstance {
  return new SendBird({ appId: 'DE368CF8-F364-498C-A481-554B90C33D4A' });
}

const declarations = [
  ChannelListComponent,
  MessagesListComponent,
  SendMessageComponent,
  AddOpenChannelComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    declarations,
    ChannelListInnerComponent,
    MessagesListInnerComponent,
    MessageFormComponent
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
