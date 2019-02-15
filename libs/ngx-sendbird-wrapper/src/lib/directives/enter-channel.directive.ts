import { Directive, HostListener, Input } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Directive({
  selector: '[stottleEnterChannel]'
})
export class EnterChannelDirective {
  @Input()
  channel: SendBird.BaseChannel;

  constructor(private vs: SendbirdViewStateService) {}

  @HostListener('click')
  channelSelected(): void {
    if (this.channel.isOpenChannel()) {
      this.vs
        .enterOpenChannel(this.channel as SendBird.OpenChannel)
        .subscribe();
    }

    if (this.channel.isGroupChannel()) {
      this.vs
        .enterGroupChannel(this.channel as SendBird.GroupChannel)
        .subscribe();
    }
  }
}
