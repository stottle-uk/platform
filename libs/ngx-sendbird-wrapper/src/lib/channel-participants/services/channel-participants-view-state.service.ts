import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { ChannelsViewStateService } from '../../channels/services/channels-view-state.services';
import { SendbirdEventHandlersService } from '../../_shared/services/sendbird-event-handlers.service';
import { SendBirdService } from '../../_shared/services/sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelParticipantsViewStateService {
  private internalCurrentChannelParticipants$ = new BehaviorSubject<
    SendBird.User[]
  >([]);

  get currentChannel$(): Observable<
    SendBird.OpenChannel | SendBird.GroupChannel
  > {
    return this.channels.currentChannel$;
  }

  get currentChannelParticipants$(): Observable<SendBird.User[]> {
    return this.internalCurrentChannelParticipants$.asObservable();
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService,
    private channels: ChannelsViewStateService
  ) {}

  getChannelParticipants(): Observable<SendBird.User[]> {
    return merge(this.currentChannel$, this.sbh.channelChanged$).pipe(
      switchMap(channel =>
        channel.isOpenChannel()
          ? this.sb.getChannelParticipants(channel as SendBird.OpenChannel)
          : of((channel as SendBird.GroupChannel).members)
      ),
      tap(participants =>
        this.internalCurrentChannelParticipants$.next(participants)
      )
    );
  }
}
