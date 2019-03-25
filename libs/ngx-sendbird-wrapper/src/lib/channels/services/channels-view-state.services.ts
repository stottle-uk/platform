import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { NotifyOnChangesService } from '../../_shared/services/notify-on-changes.service';
import { SendbirdEventHandlersService } from '../../_shared/services/sendbird-event-handlers.service';
import { SendBirdService } from '../../_shared/services/sendbird.service';

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

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService,
    private notifier: NotifyOnChangesService
  ) {
    notifier.registerNotifier('channels');
  }

  setupHandlers(): Observable<SendBird.BaseChannel | string> {
    return merge(this.onChannelChanged(), this.onChannelDeleted());
  }

  getOpenChannel(channelUrl: string): Observable<SendBird.OpenChannel> {
    return this.sb.getOpenChannel(channelUrl);
  }

  getGroupChannel(channelUrl: string): Observable<SendBird.GroupChannel> {
    return this.sb.getGroupChannel(channelUrl);
  }

  createOpenChannel(
    name: string,
    coverUrlOrImageFile: string | File,
    data: string,
    operatorUserIds: Array<string> | string,
    customType: string
  ): Observable<SendBird.OpenChannel> {
    const channels = this.internalOpenChannels$.value;

    return this.sb
      .createOpenChannel(
        name,
        coverUrlOrImageFile,
        data,
        operatorUserIds,
        customType
      )
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
    return !!this.internalCurrentChannel$.value &&
      this.internalCurrentChannel$.value.url === channel.url
      ? of(channel)
      : this.exitCurrentChannel().pipe(
          switchMap(() =>
            this.sb.enterChannel(channel).pipe(
              tap(() => this.internalCurrentChannel$.next(channel)),
              map(() => channel)
            )
          )
        );
  }

  exitCurrentChannel(): Observable<SendBird.OpenChannel> {
    const channel = this.internalCurrentChannel$.value;

    return !!channel && channel.isOpenChannel()
      ? this.sb.exitChannel(channel as SendBird.OpenChannel)
      : of(null);
  }

  enterGroupChannel(
    channel: SendBird.GroupChannel
  ): Observable<SendBird.GroupChannel> {
    return of(channel).pipe(tap(c => this.internalCurrentChannel$.next(c)));
  }

  updateOpenChannel(
    name: string,
    coverUrl: string,
    data: string,
    operatorUserIds: Array<string> | string,
    customType: string
  ): Observable<SendBird.OpenChannel> {
    return this.currentChannel$.pipe(
      take(1),
      filter(channel => channel.isOpenChannel()),
      map(channel => channel as SendBird.OpenChannel),
      switchMap(channel =>
        this.sb.updateOpenChannel(
          channel,
          name,
          coverUrl,
          data,
          operatorUserIds,
          customType
        )
      )
    );
  }

  deleteOpenChannel(): Observable<SendBird.OpenChannel> {
    return this.currentChannel$.pipe(
      take(1),
      filter(channel => channel.isOpenChannel()),
      map(channel => channel as SendBird.OpenChannel),
      switchMap(channel => this.sb.deleteOpenChannel(channel))
    );
  }

  onChannelChanged(): Observable<SendBird.OpenChannel | SendBird.GroupChannel> {
    return this.sbh.changedChannel$.pipe(
      tap(channel =>
        this.updateChannels(
          channel,
          channel.isOpenChannel()
            ? this.internalOpenChannels$
            : this.internalGroupChannels$
        )
      ),
      tap(() => this.notifier.markAllForNotify())
    );
  }

  onChannelDeleted(): Observable<string> {
    return this.sbh.deletedChannel$.pipe(
      tap(channelUrl =>
        this.internalOpenChannels$.next(
          this.internalOpenChannels$.value.filter(c => c.url !== channelUrl)
        )
      ),
      tap(() => this.notifier.markAllForNotify()),
      tap(() => this.internalCurrentChannel$.next(null))
    );
  }

  private updateChannels<T extends SendBird.BaseChannel>(
    updatedChannel: T,
    channels$: BehaviorSubject<T[]>
  ): void {
    return channels$.next(
      channels$.value.map(channel =>
        this.updateChannelWhenUrlMatches(channel, updatedChannel)
      )
    );
  }

  private updateChannelWhenUrlMatches<T extends SendBird.BaseChannel>(
    channel: T,
    updatedChannel: T
  ): T {
    return channel.url === updatedChannel.url ? updatedChannel : channel;
  }
}
