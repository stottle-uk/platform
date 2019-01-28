import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as SendBird from 'sendbird';
import { SEND_BIRD } from './services/sendbird.service';

export function sendBirdFactory(): SendBird.SendBirdInstance {
  return new SendBird({ appId: 'DE368CF8-F364-498C-A481-554B90C33D4A' });
}

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: SEND_BIRD,
      useFactory: sendBirdFactory
    }
  ]
})
export class NgxSendbirdWrapperModule {}
