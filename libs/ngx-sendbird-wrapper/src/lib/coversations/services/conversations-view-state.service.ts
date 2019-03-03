import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { ChannelsViewStateService } from '../../channels/services/channels-view-state.services';
import { PreviousListQueries } from '../../_shared/models/shared.models';
import { SendbirdEventHandlersService } from '../../_shared/services/sendbird-event-handlers.service';
import { SendBirdService } from '../../_shared/services/sendbird.service';

export interface Dictioanry<T> {
  [key: number]: T;
}

export type MessageHanlderd =
  | string
  | SendBird.UserMessage
  | SendBird.FileMessage;

@Injectable({
  providedIn: 'root'
})
export class ConversationsViewStateService {
  private internalLastCallType$ = new BehaviorSubject<string>('');
  private internalPreviousMessageListQueries$ = new BehaviorSubject<
    PreviousListQueries<SendBird.PreviousMessageListQuery>
  >({});
  private internalMessages$ = new BehaviorSubject<
    Dictioanry<SendBird.UserMessage | SendBird.FileMessage>
  >({});
  private internalUpdateList$ = new BehaviorSubject<number[]>([]);

  get lastCallType$(): Observable<string> {
    return this.internalLastCallType$.asObservable();
  }

  get previousMessageListQueries$(): Observable<
    PreviousListQueries<SendBird.PreviousMessageListQuery>
  > {
    return this.internalPreviousMessageListQueries$
      .asObservable()
      .pipe(filter(queries => !!queries));
  }

  get currentChannel$(): Observable<
    SendBird.OpenChannel | SendBird.GroupChannel
  > {
    return this.channels.currentChannel$;
  }

  get messages$(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    return this.internalMessages$
      .asObservable()
      .pipe(map(messages => Object.values(messages)));
  }

  get updateList$(): Observable<number[]> {
    return this.internalUpdateList$.asObservable();
  }

  get currentChannelPreviousMessageListQuery$(): Observable<
    SendBird.PreviousMessageListQuery
  > {
    return combineLatest(
      this.previousMessageListQueries$,
      this.currentChannel$
    ).pipe(map(([queries, channel]) => queries[channel.url]));
  }

  get currentChannelMessages$(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    return combineLatest(this.messages$, this.currentChannel$).pipe(
      map(([messages, channel]) =>
        messages.filter(m => m.channelUrl === channel.url)
      )
    );
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService,
    private channels: ChannelsViewStateService
  ) {}

  setupHandlers(): Observable<MessageHanlderd> {
    return merge(this.onMessageDeleted(), this.onMessageReceived());
  }

  addToUpdateList(messageId: number): void {
    this.internalUpdateList$.next([
      ...this.internalUpdateList$.value,
      messageId
    ]);
  }

  getMessagesForCurrentChannel(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    return this.currentChannel$.pipe(
      tap(() => this.internalLastCallType$.next('get')),
      switchMap(channel =>
        this.currentChannelMessages$.pipe(
          take(1),
          switchMap(messages =>
            messages.length > 0
              ? of([])
              : this.createQueryAndGetMessages(channel)
          )
        )
      )
    );
  }

  getMoreMessagesForCurrentChannel(): Observable<
    Array<SendBird.UserMessage | SendBird.FileMessage>
  > {
    return this.currentChannelPreviousMessageListQuery$.pipe(
      take(1),
      tap(() => this.internalLastCallType$.next('getMore')),
      filter(query => query.hasMore && !query.isLoading),
      switchMap(query =>
        this.sb
          .getPreviousMessages(query)
          .pipe(
            tap(newMessages =>
              this.internalMessages$.next(this.reduceMessages(newMessages))
            )
          )
      )
    );
  }

  sendMessage(message: string): Observable<SendBird.UserMessage> {
    return this.currentChannel$.pipe(
      take(1),
      tap(() => this.internalLastCallType$.next('add')),
      switchMap(channel =>
        this.sb
          .sendMessage(message, channel)
          .pipe(
            tap(newMessage =>
              this.internalMessages$.next(this.reduceMessages([newMessage]))
            )
          )
      )
    );
  }

  sendFileMessage(file: File): Observable<SendBird.FileMessage> {
    return this.currentChannel$.pipe(
      take(1),
      tap(() => this.internalLastCallType$.next('add')),
      switchMap(channel =>
        this.sb
          .sendFileMessage(file, channel)
          .pipe(
            tap(newMessage =>
              this.internalMessages$.next(this.reduceMessages([newMessage]))
            )
          )
      )
    );
  }

  updateMessage(
    messageId: number,
    message: string
  ): Observable<SendBird.UserMessage> {
    return this.currentChannel$.pipe(
      take(1),
      tap(() => this.internalLastCallType$.next('update')),
      switchMap(channel =>
        this.sb
          .updateMessage(channel, messageId, message, null, null)
          .pipe(
            tap(updatedMessage =>
              this.internalMessages$.next(this.reduceMessages([updatedMessage]))
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

  private createQueryAndGetMessages(
    channel: SendBird.OpenChannel | SendBird.GroupChannel
  ) {
    const previousMessagesQuery = channel.createPreviousMessageListQuery();
    return of(previousMessagesQuery).pipe(
      tap(query => (query.limit = 5)),
      switchMap(query =>
        this.sb.getPreviousMessages(query).pipe(
          tap(() =>
            this.internalPreviousMessageListQueries$.next({
              ...this.internalPreviousMessageListQueries$.value,
              [channel.url]: query
            })
          ),
          tap(newMessages =>
            this.internalMessages$.next(
              this.reduceMessages(newMessages.reverse(), true)
            )
          )
        )
      )
    );
  }

  // TODO: listen to these
  onMessageDeleted(): Observable<string> {
    return this.sbh.deletedMessage$.pipe(
      tap(deletedMessageId => {
        const messages = this.internalMessages$.value;

        const updatedMessages = Object.keys(messages)
          .filter(key => key !== deletedMessageId)
          .reduce(
            (prev, key) => ({
              ...prev,
              [key]: messages[key]
            }),
            {}
          );

        this.internalMessages$.next(updatedMessages);
      })
    );
  }

  onMessageReceived(): Observable<SendBird.UserMessage | SendBird.FileMessage> {
    return this.sbh.recievedMessage$.pipe(
      tap(message =>
        this.internalMessages$.next(this.reduceMessages([message]))
      )
    );
  }

  private reduceMessages(
    messages: Array<SendBird.UserMessage | SendBird.FileMessage>,
    suffix = false
  ) {
    return messages.reduce(
      (prev, curr) =>
        suffix
          ? {
              [curr.messageId]: curr,
              ...prev
            }
          : {
              ...prev,
              [curr.messageId]: curr
            },
      this.internalMessages$.value
    );
  }
}
