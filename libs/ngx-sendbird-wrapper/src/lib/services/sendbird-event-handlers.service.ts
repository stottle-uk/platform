import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SEND_BIRD } from './sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class SendbirdEventHandlersService {
  private internalDeletedMessage$ = new Subject<string>();
  private internalReceivedMessage$ = new Subject<
    SendBird.UserMessage | SendBird.FileMessage
  >();
  private internalChannelChanged$ = new Subject<
    SendBird.OpenChannel | SendBird.GroupChannel
  >();
  private internalReceivedInvitation$ = new Subject<SendBird.GroupChannel>();
  private channelHandler = new this.sb.ChannelHandler();

  get deletedMessage$(): Observable<string> {
    return this.internalDeletedMessage$.asObservable();
  }

  get recievedMessage$(): Observable<
    SendBird.UserMessage | SendBird.FileMessage
  > {
    return this.internalReceivedMessage$.asObservable();
  }

  get channelChanged$(): Observable<
    SendBird.OpenChannel | SendBird.GroupChannel
  > {
    return this.internalChannelChanged$.asObservable();
  }

  get userReceivedInvitation$(): Observable<SendBird.GroupChannel> {
    return this.internalReceivedInvitation$.asObservable();
  }

  constructor(@Inject(SEND_BIRD) private sb: SendBird.SendBirdInstance) {}

  setupHandlers() {
    this.channelHandler.onChannelChanged = this.onChannelChanged.bind(this);
    this.channelHandler.onMessageReceived = this.onMessageReceived.bind(this);
    this.channelHandler.onMessageDeleted = this.onMessageDelete.bind(this);
    this.channelHandler.onUserEntered = this.onChannelChanged.bind(this);
    this.channelHandler.onUserExited = this.onChannelChanged.bind(this);
    this.channelHandler.onUserReceivedInvitation = this.onUserReceivedInvitation.bind(
      this
    );

    this.sb.addChannelHandler('channelHandler', this.channelHandler);
  }

  removeHandlers() {
    this.sb.removeChannelHandler('channelHandler');
  }

  private onMessageReceived(
    channel: SendBird.OpenChannel | SendBird.GroupChannel,
    message: SendBird.UserMessage | SendBird.FileMessage
  ): void {
    this.internalReceivedMessage$.next(message);
  }

  private onMessageDelete(
    channel: SendBird.OpenChannel | SendBird.GroupChannel,
    messageId: string // TODO, this should be a number
  ): void {
    this.internalDeletedMessage$.next(messageId);
  }

  private onChannelChanged(
    channel: SendBird.OpenChannel | SendBird.GroupChannel
  ): void {
    this.internalChannelChanged$.next(channel);
  }

  private onUserReceivedInvitation(
    channel: SendBird.GroupChannel,
    inviter: SendBird.User,
    invitees: SendBird.User[]
  ): void {
    this.internalReceivedInvitation$.next(channel);
  }
}
