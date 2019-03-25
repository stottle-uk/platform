import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ConnectionViewStateService } from '../../connection/services/connection-view-state.service';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleGetAndEnterChannel]'
})
export class GetAndEnterChannelDirective implements OnChanges {
  @Input()
  channelUrl: string;
  @Output()
  userCanEdit = new EventEmitter<boolean>();

  constructor(
    private vs: ChannelsViewStateService,
    private cvs: ConnectionViewStateService
  ) {}

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
    return this.vs.getGroupChannel(channelUrl).pipe(
      switchMap(channel => this.vs.enterGroupChannel(channel)),
      map(channel => channel.myRole === 'operator'),
      tap(isOperator => this.userCanEdit.emit(isOperator))
    );
  }

  private getAndEnterOpenChannel(channelUrl: string) {
    return this.vs.getOpenChannel(channelUrl).pipe(
      switchMap(channel => this.vs.enterOpenChannel(channel)),
      withLatestFrom(this.cvs.currentUser$),
      map(([channel, user]) => channel.isOperator(user)),
      tap(isOperator => this.userCanEdit.emit(isOperator))
    );
  }
}
