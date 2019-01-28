import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import * as SendBird from 'sendbird';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';
import { MessagesListInnerComponent } from './components/messages-list-inner.component';
import { ChannelListComponent } from './containers/channel-list.component';
import { MessagesListComponent } from './containers/messages-list.component';
import { SEND_BIRD } from './services/sendbird.service';

export function sendBirdFactory(): SendBird.SendBirdInstance {
  return new SendBird({ appId: 'DE368CF8-F364-498C-A481-554B90C33D4A' });
}

const declarations = [ChannelListComponent, MessagesListComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [
    declarations,
    ChannelListInnerComponent,
    MessagesListInnerComponent
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
