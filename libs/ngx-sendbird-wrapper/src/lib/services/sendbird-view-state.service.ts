import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { SendbirdEventHandlersService } from './sendbird-event-handlers.service';
import { SendBirdService } from './sendbird.service';

export type Connection =
  | SendBird.User
  | string
  | SendBird.UserMessage
  | SendBird.FileMessage;

@Injectable({
  providedIn: 'root'
})
export class SendbirdViewStateService {
  private internalIsConnected$ = new BehaviorSubject<boolean>(false);
  private internalCurrentUser$ = new BehaviorSubject<SendBird.User>(null);
  private internalPreviousMessageListQuery$ = new BehaviorSubject<
    SendBird.PreviousMessageListQuery
  >(null);
  private internalCurrentChannel$ = new BehaviorSubject<SendBird.OpenChannel>(
    null
  );
  private internalOpenChannels$ = new BehaviorSubject<SendBird.OpenChannel[]>(
    []
  );
  private internalMessagesForCurrentChannel$ = new BehaviorSubject<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  >([]);
  private internalParticipantsForCurrentChannel$ = new BehaviorSubject<
    SendBird.User[]
  >([]);

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

  get currentChannel$(): Observable<SendBird.OpenChannel> {
    return this.internalCurrentChannel$
      .asObservable()
      .pipe(filter(channel => !!channel));
  }

  get messagesForCurrentChannel$(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    return this.internalMessagesForCurrentChannel$.asObservable();
  }

  get participantsForCurrentChannel$(): Observable<SendBird.User[]> {
    return this.internalParticipantsForCurrentChannel$.asObservable();
  }

  get openChannels$(): Observable<SendBird.OpenChannel[]> {
    return this.internalOpenChannels$.asObservable();
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService
  ) {}

  connect(userId: string): Observable<Connection> {
    const connect = this.sb.connect(userId).pipe(
      tap(user => this.internalCurrentUser$.next(user)),
      tap(() => this.internalIsConnected$.next(true))
    );

    return merge(connect, this.onMessageDeleted(), this.onMessageReceived());
  }

  createOpenChannel(): Observable<SendBird.OpenChannel> {
    const channels = this.internalOpenChannels$.value;

    return this.sb
      .createOpenChannel()
      .pipe(
        tap(channel => this.internalOpenChannels$.next([channel, ...channels]))
      );
  }

  enterChannel(
    channel: SendBird.OpenChannel
  ): Observable<SendBird.OpenChannel> {
    return this.sb
      .enterChannel(channel)
      .pipe(tap(() => this.setCurrentChannel(channel)));
  }

  getOpenChannels(): Observable<SendBird.OpenChannel[]> {
    return this.sb
      .getOpenChannels()
      .pipe(tap(channels => this.internalOpenChannels$.next(channels)));
  }

  getChannelParticipants(): Observable<SendBird.User[]> {
    return this.currentChannel$.pipe(
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
      map(channel => channel.createPreviousMessageListQuery()),
      tap(query => (query.limit = 5)),
      tap(query => this.internalPreviousMessageListQuery$.next(query)),
      switchMap(query =>
        this.sb
          .getPreviousMessages(query)
          .pipe(
            tap(messages =>
              this.internalMessagesForCurrentChannel$.next(messages)
            )
          )
      )
    );
  }

  getMoreMessagesForCurrentChannel(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    const messages = this.internalMessagesForCurrentChannel$.value;

    return this.previousMessageListQuery$.pipe(
      take(1),
      filter(query => query.hasMore && !query.isLoading),
      switchMap(query =>
        this.sb
          .getPreviousMessages(query)
          .pipe(
            tap(newMessages =>
              this.internalMessagesForCurrentChannel$.next([
                ...newMessages,
                ...messages
              ])
            )
          )
      )
    );
  }

  sendMessage(message: string): Observable<SendBird.UserMessage> {
    const messages = this.internalMessagesForCurrentChannel$.value;

    return this.currentChannel$.pipe(
      take(1),
      switchMap(channel =>
        this.sb
          .sendMessage(message, channel)
          .pipe(
            tap(newMessage =>
              this.internalMessagesForCurrentChannel$.next([
                ...messages,
                newMessage
              ])
            )
          )
      )
    );
  }

  sendFileMessage(file: File): Observable<SendBird.FileMessage> {
    const messages = this.internalMessagesForCurrentChannel$.value;

    return this.currentChannel$.pipe(
      take(1),
      switchMap(channel =>
        this.sb
          .sendFileMessage(file, channel)
          .pipe(
            tap(newMessage =>
              this.internalMessagesForCurrentChannel$.next([
                ...messages,
                newMessage
              ])
            )
          )
      )
    );
  }

  deleteMessage(
    message: SendBird.UserMessage | SendBird.FileMessage
  ): Observable<SendBird.UserMessage | SendBird.FileMessage> {
    const messages = this.internalMessagesForCurrentChannel$.value;

    return this.currentChannel$.pipe(
      take(1),
      switchMap(channel => this.sb.deleteMessage(message, channel))
    );
  }

  private setCurrentChannel(channel: SendBird.OpenChannel): void {
    this.internalCurrentChannel$.next(channel);
  }

  private onMessageDeleted(): Observable<string> {
    return this.sbh.deletedMessage$.pipe(
      tap(messageId =>
        this.internalMessagesForCurrentChannel$.next(
          this.internalMessagesForCurrentChannel$.value.filter(
            m => m.messageId !== +messageId
          )
        )
      )
    );
  }

  private onMessageReceived(): Observable<
    SendBird.UserMessage | SendBird.FileMessage
  > {
    return this.sbh.recievedMessage$.pipe(
      tap(newMessage =>
        this.internalMessagesForCurrentChannel$.next([
          ...this.internalMessagesForCurrentChannel$.value,
          newMessage
        ])
      )
    );
  }
}
