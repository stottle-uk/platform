import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SEND_BIRD } from './sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class SendbirdEventHandlersService {
  private internalDeletedMessage$ = new BehaviorSubject<string>(null);
  private internalReceivedMessage$ = new BehaviorSubject<
    SendBird.UserMessage | SendBird.FileMessage
  >(null);

  private channelHandler = new this.sb.ChannelHandler();

  get deletedMessage$(): Observable<string> {
    return this.internalDeletedMessage$.asObservable().pipe(filter(id => !!id));
  }

  get recievedMessage$(): Observable<
    SendBird.UserMessage | SendBird.FileMessage
  > {
    return this.internalReceivedMessage$
      .asObservable()
      .pipe(filter(message => !!message));
  }

  constructor(@Inject(SEND_BIRD) private sb: SendBird.SendBirdInstance) {
    this.setupHandlers(sb);
  }

  private setupHandlers(sb: SendBird.SendBirdInstance) {
    this.channelHandler.onChannelChanged = this.onChannelChanged();
    this.channelHandler.onMessageReceived = this.onMessageReceived.bind(this);
    this.channelHandler.onMessageDeleted = this.onMessageDelete.bind(this);

    sb.addChannelHandler('channelHandler', this.channelHandler);
  }

  private onChannelChanged(): (
    channel: SendBird.OpenChannel | SendBird.GroupChannel
  ) => void {
    return channel => {
      console.log(channel);
    };
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
}
