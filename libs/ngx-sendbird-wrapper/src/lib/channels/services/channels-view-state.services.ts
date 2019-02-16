import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { SendBirdService } from '../../services/sendbird.service';

export interface PreviousMessageListQueries {
  [url: string]: SendBird.PreviousMessageListQuery;
}

export type Connection =
  | SendBird.User
  | string
  | SendBird.UserMessage
  | SendBird.FileMessage
  | SendBird.GroupChannel;

@Injectable({
  providedIn: 'root'
})
export class ChannelsViewStateService {
  private internalLastCallType$ = new BehaviorSubject<string>('');
  private internalOpenChannels$ = new BehaviorSubject<SendBird.OpenChannel[]>(
    []
  );
  private internalGroupChannels$ = new BehaviorSubject<SendBird.GroupChannel[]>(
    []
  );
  private internalCurrentChannel$ = new BehaviorSubject<
    SendBird.OpenChannel | SendBird.GroupChannel
  >(null);

  get lastCallType$(): Observable<string> {
    return this.internalLastCallType$.asObservable();
  }

  get openChannels$(): Observable<SendBird.OpenChannel[]> {
    return this.internalOpenChannels$.asObservable();
  }

  get groupChannels$(): Observable<SendBird.GroupChannel[]> {
    return this.internalGroupChannels$.asObservable();
  }

  get currentChannel$(): Observable<
    SendBird.OpenChannel | SendBird.GroupChannel
  > {
    return this.internalCurrentChannel$
      .asObservable()
      .pipe(filter(channel => !!channel));
  }

  constructor(private sb: SendBirdService) {}

  createOpenChannel(name: string): Observable<SendBird.OpenChannel> {
    const channels = this.internalOpenChannels$.value;

    return this.sb
      .createOpenChannel(name, null, null, null, null)
      .pipe(
        tap(channel => this.internalOpenChannels$.next([channel, ...channels]))
      );
  }

  getOpenChannels(): Observable<SendBird.OpenChannel[]> {
    return this.sb
      .getOpenChannels()
      .pipe(tap(channels => this.internalOpenChannels$.next(channels)));
  }

  createGroupChannel(
    userIds: string[],
    distinct: boolean,
    name: string
  ): Observable<SendBird.GroupChannel> {
    const channels = this.internalGroupChannels$.value;

    return this.sb
      .createGroupChannel(userIds, distinct, name, null, null, null)
      .pipe(
        tap(channel => this.internalGroupChannels$.next([channel, ...channels]))
      );
  }

  getGroupChannels(): Observable<SendBird.GroupChannel[]> {
    return this.sb
      .getGroupChannels()
      .pipe(tap(channels => this.internalGroupChannels$.next(channels)));
  }

  enterOpenChannel(
    channel: SendBird.OpenChannel
  ): Observable<SendBird.OpenChannel> {
    return this.sb.enterChannel(channel).pipe(
      switchMap(() =>
        this.exitCurrentChannel().pipe(
          tap(() => this.internalCurrentChannel$.next(channel)),
          map(() => channel)
        )
      )
    );
  }

  exitCurrentChannel(): Observable<SendBird.OpenChannel> {
    const channel = this.internalCurrentChannel$.value;

    return !!channel && channel.isOpenChannel()
      ? this.currentChannel$.pipe(
          take(1),
          switchMap(channel =>
            this.sb.exitChannel(channel as SendBird.OpenChannel)
          )
        )
      : of(null);
  }

  enterGroupChannel(
    channel: SendBird.GroupChannel
  ): Observable<SendBird.GroupChannel> {
    return of(channel).pipe(
      tap(channel => this.internalCurrentChannel$.next(channel))
      // tap(channel =>
      //   this.internalCurrentChannelParticipants$.next(channel.members) // TODO: fix this
      // )
    );
  }
}
