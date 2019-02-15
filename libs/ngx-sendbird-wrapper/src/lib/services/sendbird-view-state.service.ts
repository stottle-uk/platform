import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { SendbirdEventHandlersService } from './sendbird-event-handlers.service';
import { SendBirdService } from './sendbird.service';

export type Connection =
  | SendBird.User
  | string
  | SendBird.UserMessage
  | SendBird.FileMessage
  | SendBird.GroupChannel;

@Injectable()
export class SendbirdViewStateService {
  private internalLastCallType$ = new BehaviorSubject<string>('');
  private internalIsConnected$ = new BehaviorSubject<boolean>(false);
  private internalCurrentUser$ = new BehaviorSubject<SendBird.User>(null);
  private internalPreviousMessageListQuery$ = new BehaviorSubject<
    SendBird.PreviousMessageListQuery
  >(null);
  private internalCurrentChannel$ = new BehaviorSubject<
    SendBird.OpenChannel | SendBird.GroupChannel
  >(null);
  private internalOpenChannels$ = new BehaviorSubject<SendBird.OpenChannel[]>(
    []
  );
  private internalGroupChannels$ = new BehaviorSubject<SendBird.GroupChannel[]>(
    []
  );
  private internalMessages$ = new BehaviorSubject<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  >([]);
  private internalParticipantsForCurrentChannel$ = new BehaviorSubject<
    SendBird.User[]
  >([]);
  private internalReceivedInvitations$ = new BehaviorSubject<
    SendBird.GroupChannel[]
  >([]);

  get lastCallType$(): Observable<string> {
    return this.internalLastCallType$.asObservable();
  }

  get isConnected$(): Observable<boolean> {
    return this.internalIsConnected$.asObservable();
  }

  get currentUser$(): Observable<SendBird.User> {
    return this.internalCurrentUser$
      .asObservable()
      .pipe(filter(user => !!user));
  }

  get previousMessageListQuery$(): Observable<
    SendBird.PreviousMessageListQuery
  > {
    return this.internalPreviousMessageListQuery$
      .asObservable()
      .pipe(filter(query => !!query));
  }

  get currentChannel$(): Observable<
    SendBird.OpenChannel | SendBird.GroupChannel
  > {
    return this.internalCurrentChannel$
      .asObservable()
      .pipe(filter(channel => !!channel));
  }

  get messages$(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    return this.internalMessages$.asObservable();
  }

  get messagesForCurrentChannel$(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    return combineLatest(this.messages$, this.currentChannel$).pipe(
      map(([messages, channel]) =>
        messages.filter(m => m.channelUrl === channel.url)
      )
    );
  }

  get participantsForCurrentChannel$(): Observable<SendBird.User[]> {
    return this.internalParticipantsForCurrentChannel$.asObservable();
  }

  get openChannels$(): Observable<SendBird.OpenChannel[]> {
    return this.internalOpenChannels$.asObservable();
  }

  get groupChannels$(): Observable<SendBird.GroupChannel[]> {
    return this.internalGroupChannels$.asObservable();
  }

  get receivedInvitations$(): Observable<SendBird.GroupChannel[]> {
    return this.internalReceivedInvitations$.asObservable();
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService
  ) {}

  connect(userId: string): Observable<Connection> {
    const connect = this.sb.connect(userId).pipe(
      tap(user => this.internalCurrentUser$.next(user)),
      tap(() => this.internalIsConnected$.next(true)),
      tap(() => this.sbh.setupHandlers())
    );

    return merge(
      connect,
      this.onMessageDeleted(),
      this.onMessageReceived(),
      this.onUserReceivedInvitation()
    );
  }

  disconnect(): Observable<Object> {
    return this.sb.disconnect().pipe(
      tap(() => this.internalCurrentUser$.next(null)),
      tap(() => this.internalCurrentChannel$.next(null)),
      tap(() => this.internalIsConnected$.next(false)),
      tap(() => this.internalParticipantsForCurrentChannel$.next([])),
      tap(() => this.internalMessages$.next([])),
      tap(() => this.internalOpenChannels$.next([])),
      tap(() => this.internalPreviousMessageListQuery$.next(null)),
      tap(() => this.sbh.removeHandlers())
    );
  }

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
      tap(channel => this.internalCurrentChannel$.next(channel)),
      tap(channel =>
        this.internalParticipantsForCurrentChannel$.next(channel.members)
      )
    );
  }

  getChannelParticipants(): Observable<SendBird.User[]> {
    return merge(this.currentChannel$, this.sbh.channelChanged$).pipe(
      filter(channel => channel.isOpenChannel()),
      map(channel => channel as SendBird.OpenChannel),
      switchMap(channel =>
        this.sb
          .getChannelParticipants(channel)
          .pipe(
            tap(participants =>
              this.internalParticipantsForCurrentChannel$.next(participants)
            )
          )
      )
    );
  }

  getMessagesForCurrentChannel(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    return this.currentChannel$.pipe(
      tap(() => this.internalLastCallType$.next('get')),
      map(channel => channel.createPreviousMessageListQuery()),
      tap(query => (query.limit = 5)),
      tap(query => this.internalPreviousMessageListQuery$.next(query)),
      switchMap(query =>
        this.sb
          .getPreviousMessages(query)
          .pipe(tap(messages => this.internalMessages$.next(messages)))
      )
    );
  }

  getMoreMessagesForCurrentChannel(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    const messages = this.internalMessages$.value;

    return this.previousMessageListQuery$.pipe(
      take(1),
      tap(() => this.internalLastCallType$.next('getMore')),
      filter(query => query.hasMore && !query.isLoading),
      switchMap(query =>
        this.sb
          .getPreviousMessages(query)
          .pipe(
            tap(newMessages =>
              this.internalMessages$.next([...newMessages, ...messages])
            )
          )
      )
    );
  }

  sendMessage(message: string): Observable<SendBird.UserMessage> {
    const messages = this.internalMessages$.value;

    return this.currentChannel$.pipe(
      take(1),
      tap(() => this.internalLastCallType$.next('add')),
      switchMap(channel =>
        this.sb
          .sendMessage(message, channel)
          .pipe(
            tap(newMessage =>
              this.internalMessages$.next([...messages, newMessage])
            )
          )
      )
    );
  }

  sendFileMessage(file: File): Observable<SendBird.FileMessage> {
    const messages = this.internalMessages$.value;

    return this.currentChannel$.pipe(
      take(1),
      tap(() => this.internalLastCallType$.next('add')),
      switchMap(channel =>
        this.sb
          .sendFileMessage(file, channel)
          .pipe(
            tap(newMessage =>
              this.internalMessages$.next([...messages, newMessage])
            )
          )
      )
    );
  }

  deleteMessage(
    message: SendBird.UserMessage | SendBird.FileMessage
  ): Observable<SendBird.UserMessage | SendBird.FileMessage> {
    return this.currentChannel$.pipe(
      take(1),
      tap(() => this.internalLastCallType$.next('delete')),
      switchMap(channel => this.sb.deleteMessage(message, channel))
    );
  }

  private onMessageDeleted(): Observable<string> {
    return this.sbh.deletedMessage$.pipe(
      tap(messageId =>
        this.internalMessages$.next(
          this.internalMessages$.value.filter(m => m.messageId !== +messageId)
        )
      )
    );
  }

  private onMessageReceived(): Observable<
    SendBird.UserMessage | SendBird.FileMessage
  > {
    return this.sbh.recievedMessage$.pipe(
      tap(message =>
        this.internalMessages$.next([...this.internalMessages$.value, message])
      )
    );
  }

  private onUserReceivedInvitation(): Observable<SendBird.GroupChannel> {
    return this.sbh.userReceivedInvitation$.pipe(
      tap(invitation =>
        this.internalReceivedInvitations$.next([
          ...this.internalReceivedInvitations$.value,
          invitation
        ])
      )
    );
  }
}
