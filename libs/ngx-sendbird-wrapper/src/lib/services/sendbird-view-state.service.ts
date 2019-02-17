import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ConversationsViewStateService } from '../coversations/services/conversations-view-state.service';
import { ReceievedInvitationsViewStateService } from '../receieved-invitations/services/receieved-invitations-view-state.service';
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

  get isConnected$(): Observable<boolean> {
    return this.internalIsConnected$.asObservable();
  }

  get currentUser$(): Observable<SendBird.User> {
    return this.internalCurrentUser$
      .asObservable()
      .pipe(filter(user => !!user));
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService,
    private conversations: ConversationsViewStateService,
    private invitations: ReceievedInvitationsViewStateService
  ) {}

  connect(userId: string): Observable<Connection> {
    const connect = this.sb.connect(userId).pipe(
      tap(user => this.internalCurrentUser$.next(user)),
      tap(() => this.internalIsConnected$.next(true)),
      tap(() => this.sbh.setupHandlers())
    );

    return merge(
      connect,
      this.conversations.onMessageReceived(),
      this.conversations.onMessageDeleted(),
      this.invitations.onUserReceivedInvitation()
    );
  }

  disconnect(): Observable<Object> {
    return this.sb.disconnect().pipe(
      tap(() => this.internalCurrentUser$.next(null)),
      tap(() => this.internalIsConnected$.next(false)),
      tap(() => this.sbh.removeHandlers())
    );
  }
}
