import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { ChannelsViewStateService } from '../../channels/services/channels-view-state.services';
import {
  Dictionary,
  PreviousListQueries
} from '../../_shared/models/shared.models';
import { SendbirdEventHandlersService } from '../../_shared/services/sendbird-event-handlers.service';
import { SendBirdService } from '../../_shared/services/sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelParticipantsViewStateService {
  private internalParticipants$ = new BehaviorSubject<
    Dictionary<SendBird.User[]>
  >([]);
  private internalParticipantListQueries$ = new BehaviorSubject<
    PreviousListQueries<SendBird.ParticipantListQuery>
  >({});

  get currentChannel$(): Observable<
    SendBird.OpenChannel | SendBird.GroupChannel
  > {
    return this.channels.currentChannel$;
  }

  get participantListQueries$(): Observable<
    PreviousListQueries<SendBird.ParticipantListQuery>
  > {
    return this.internalParticipantListQueries$
      .asObservable()
      .pipe(filter(queries => !!queries));
  }

  get participants$(): Observable<Dictionary<SendBird.User[]>> {
    return this.internalParticipants$
      .asObservable()
      .pipe(filter(participants => !!participants));
  }

  get currentChannelParticipants$(): Observable<SendBird.User[]> {
    return combineLatest(this.participants$, this.currentChannel$).pipe(
      map(([participants, channel]) => participants[channel.url])
    );
  }

  get currentChannelParticipantListQuery$(): Observable<
    SendBird.ParticipantListQuery
  > {
    return combineLatest(
      this.participantListQueries$,
      this.currentChannel$
    ).pipe(map(([queries, channel]) => queries[channel.url]));
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService,
    private channels: ChannelsViewStateService
  ) {}

  getChannelParticipants(): Observable<SendBird.User[]> {
    return merge(this.currentChannel$, this.sbh.channelChanged$).pipe(
      switchMap(channel =>
        this.currentChannelParticipants$.pipe(
          take(1),
          switchMap(participants =>
            !!participants && participants.length > 0
              ? of([])
              : channel.isOpenChannel()
              ? this.createQueryAndGetParticpants(
                  channel as SendBird.OpenChannel
                )
              : of((channel as SendBird.GroupChannel).members)
          ),
          map(participants =>
            this.reduceParticipants(channel.url, participants)
          ),
          tap(participants => this.internalParticipants$.next(participants))
        )
      ),
      switchMap(() => this.currentChannelParticipants$)
    );
  }

  private createQueryAndGetParticpants(channel: SendBird.OpenChannel) {
    const participantListQuery = channel.createParticipantListQuery();
    return of(participantListQuery).pipe(
      tap(query => (query.limit = 5)),
      switchMap(query =>
        this.sb.getChannelParticipants(query).pipe(
          tap(() =>
            this.internalParticipantListQueries$.next({
              ...this.internalParticipantListQueries$.value,
              [channel.url]: query
            })
          )
        )
      )
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
      this.internalParticipants$.value
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
