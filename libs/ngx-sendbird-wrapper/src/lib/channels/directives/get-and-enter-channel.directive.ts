import { Directive, Input, OnChanges } from '@angular/core';
import { of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleGetAndEnterChannel]'
})
export class GetAndEnterChannelDirective implements OnChanges {
  @Input()
  channelUrl: string;

  constructor(private vs: ChannelsViewStateService) {}

  ngOnChanges(): void {
    of(this.channelUrl)
      .pipe(
        filter(channelUrl => !!channelUrl),
        map(channelUrl => ({
          channelUrl,
          isOpen: channelUrl.startsWith('sendbird_open_channel')
        })),
        switchMap(params =>
          params.isOpen
            ? this.getAndEnterOpenChannel(params.channelUrl)
            : this.getAndEnterGroupChannel(params.channelUrl)
        )
      )
      .subscribe();
  }

  private getAndEnterGroupChannel(channelUrl: string) {
    return this.vs
      .getGroupChannel(channelUrl)
      .pipe(switchMap(channel => this.vs.enterGroupChannel(channel)));
  }

  private getAndEnterOpenChannel(channelUrl: string) {
    return this.vs
      .getOpenChannel(channelUrl)
      .pipe(switchMap(channel => this.vs.enterOpenChannel(channel)));
  }
}
