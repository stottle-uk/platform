import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { ChannelsViewStateService } from '../../channels/services/channels-view-state.services';
import { Dictionary } from '../../_shared/models/shared.models';
import { SendbirdEventHandlersService } from '../../_shared/services/sendbird-event-handlers.service';
import { SendBirdService } from '../../_shared/services/sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelParticipantsViewStateService {
  private internalCurrentChannelParticipants$ = new BehaviorSubject<
    Dictionary<SendBird.User[]>
  >([]);

  get currentChannel$(): Observable<
    SendBird.OpenChannel | SendBird.GroupChannel
  > {
    return this.channels.currentChannel$;
  }

  get currentChannelParticipants$(): Observable<SendBird.User[]> {
    return combineLatest(
      this.internalCurrentChannelParticipants$,
      this.currentChannel$
    ).pipe(map(([participants, channel]) => participants[channel.url]));
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService,
    private channels: ChannelsViewStateService
  ) {}

  getChannelParticipants(): Observable<SendBird.User[]> {
    return merge(this.currentChannel$, this.sbh.channelChanged$).pipe(
      mergeMap(channel =>
        channel.isOpenChannel()
          ? this.sb
              .getChannelParticipants(channel as SendBird.OpenChannel)
              .pipe(
                map(participants =>
                  this.reduceParticipants(channel.url, participants)
                )
              )
          : of((channel as SendBird.GroupChannel).members).pipe(
              map(participants =>
                this.reduceParticipants(channel.url, participants)
              )
            )
      ),
      tap(participants =>
        this.internalCurrentChannelParticipants$.next(participants)
      ),
      switchMap(() => this.currentChannelParticipants$)
    );
  }

  private reduceParticipants(
    channelUrl: string,
    participants: SendBird.User[]
  ) {
    return participants.reduce(
      (users, user) => ({
        ...users,
        [channelUrl]: !!users[channelUrl]
          ? this.appendAndRemoveDups(users, channelUrl, user)
          : [user]
      }),
      this.internalCurrentChannelParticipants$.value
    );
  }

  private appendAndRemoveDups(
    prev: Dictionary<SendBird.User[]>,
    channelUrl: string,
    curr: SendBird.User
  ): SendBird.User[] {
    const sd = [...prev[channelUrl], curr].reduce(
      (acc, cur: SendBird.User) => ({ ...acc, [cur.userId]: cur }),
      {}
    );
    return Object.values(sd);
  }
}

//
