import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { ChannelsViewStateService } from '../channels/services/channels-view-state.services';
import { ConversationsViewStateService } from '../coversations/services/conversations-view-state.service';
import { SendbirdEventHandlersService } from '../_shared/services/sendbird-event-handlers.service';
import { SendBirdService } from '../_shared/services/sendbird.service';

export type Connection =
  | SendBird.User
  | string
  | SendBird.UserMessage
  | SendBird.FileMessage
  | SendBird.GroupChannel;

@Injectable()
export class SendbirdViewStateService {
  private internalIsConnected$ = new BehaviorSubject<boolean>(false);
  private internalCurrentUser$ = new BehaviorSubject<SendBird.User>(null);
  private internalCurrentChannelParticipants$ = new BehaviorSubject<
    SendBird.User[]
  >([]);
  private internalReceivedInvitations$ = new BehaviorSubject<
    SendBird.GroupChannel[]
  >([]);

  get isConnected$(): Observable<boolean> {
    return this.internalIsConnected$.asObservable();
  }

  get currentUser$(): Observable<SendBird.User> {
    return this.internalCurrentUser$
      .asObservable()
      .pipe(filter(user => !!user));
  }

  get currentChannel$(): Observable<
    SendBird.OpenChannel | SendBird.GroupChannel
  > {
    return this.channels.currentChannel$;
  }

  get currentChannelParticipants$(): Observable<SendBird.User[]> {
    return this.internalCurrentChannelParticipants$.asObservable();
  }

  get receivedInvitations$(): Observable<SendBird.GroupChannel[]> {
    return this.internalReceivedInvitations$.asObservable();
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService,
    private channels: ChannelsViewStateService,
    private conversations: ConversationsViewStateService
  ) {}

  connect(userId: string): Observable<Connection> {
    const connect = this.sb.connect(userId).pipe(
      tap(user => this.internalCurrentUser$.next(user)),
      tap(() => this.internalIsConnected$.next(true)),
      tap(() => this.sbh.setupHandlers())
    );

    return merge(
      connect,
      this.onUserReceivedInvitation(),
      this.conversations.onMessageReceived(),
      this.conversations.onMessageDeleted()
    );
  }

  disconnect(): Observable<Object> {
    return this.sb.disconnect().pipe(
      tap(() => this.internalCurrentUser$.next(null)),
      tap(() => this.internalIsConnected$.next(false)),
      tap(() => this.internalCurrentChannelParticipants$.next([])),
      tap(() => this.sbh.removeHandlers())
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
              this.internalCurrentChannelParticipants$.next(participants)
            )
          )
      )
    );
  }

  // TODO: listen to this

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
