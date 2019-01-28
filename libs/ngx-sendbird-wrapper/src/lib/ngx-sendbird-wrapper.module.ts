import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import * as SendBird from 'sendbird';
import { ChannelListComponent } from './containers/channel-list.component';
import { SEND_BIRD } from './services/sendbird.service';
import { ChannelListInnerComponent } from './components/channel-list-inner.component';

export function sendBirdFactory(): SendBird.SendBirdInstance {
  return new SendBird({ appId: 'DE368CF8-F364-498C-A481-554B90C33D4A' });
}

const declarations = [ChannelListComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [declarations, ChannelListInnerComponent],
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
