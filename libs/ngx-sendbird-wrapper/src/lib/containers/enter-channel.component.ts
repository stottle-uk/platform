import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input
} from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: '[stottle-enter-channel]',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterChannelComponent {
  @Input()
  channel: SendBird.OpenChannel;

  constructor(private vs: SendbirdViewStateService) {}

  @HostListener('click')
  channelSelected(): void {
    this.vs.enterChannel(this.channel).subscribe();
  }
}
