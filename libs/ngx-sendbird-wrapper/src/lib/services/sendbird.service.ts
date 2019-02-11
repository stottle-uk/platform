import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as SendBird from 'sendbird';

export const SEND_BIRD = new InjectionToken<SendBird.SendBirdInstance>(
  'SEND_BIRD'
);

@Injectable({
  providedIn: 'root'
})
export class SendBirdService {
  private internalDeletedMessage$ = new BehaviorSubject<string>(null);
  private channelHandler = new this.sb.ChannelHandler();

  get deletedMessage$(): Observable<string> {
    return this.internalDeletedMessage$.asObservable().pipe(filter(id => !!id));
  }

  constructor(@Inject(SEND_BIRD) private sb: SendBird.SendBirdInstance) {
    this.setupHandlers(sb);
  }

  connect(userId: string): Observable<SendBird.User> {
    return this.co(this.sb.connect.bind(this.sb), userId);
  }

  getOpenChannels(): Observable<SendBird.OpenChannel[]> {
    var openChannelListQuery = this.sb.OpenChannel.createOpenChannelListQuery();
    return this.co(openChannelListQuery.next.bind(openChannelListQuery));
  }

  enterChannel(
    channel: SendBird.OpenChannel
  ): Observable<SendBird.OpenChannel> {
    return this.co(channel.enter.bind(channel));
  }

  getPreviousMessages(
    query: SendBird.PreviousMessageListQuery
  ): Observable<Array<SendBird.UserMessage | SendBird.FileMessage>> {
    return this.co(query.load.bind(query));
  }

  sendMessage(
    message: string,
    channel: SendBird.OpenChannel
  ): Observable<SendBird.UserMessage> {
    return this.co(channel.sendUserMessage.bind(channel), message);
  }

  sendFileMessage(
    file: File,
    channel: SendBird.OpenChannel
  ): Observable<SendBird.FileMessage> {
    return this.co(channel.sendFileMessage.bind(channel), file);
  }

  deleteMessage(
    message: SendBird.FileMessage | SendBird.UserMessage,
    channel: SendBird.OpenChannel
  ): Observable<any> {
    return this.co(channel.deleteMessage.bind(channel), message);
  }

  getChanenel(channelUrl: string): Observable<SendBird.OpenChannel> {
    return this.co(this.sb.OpenChannel.getChannel.bind(this.sb), channelUrl);
  }

  createOpenChannel(): Observable<SendBird.OpenChannel> {
    return this.co(this.sb.OpenChannel.createChannel.bind(this.sb));
  }

  // getAndEnterChannel(): (
  //   source: Observable<SendBird.OpenChannel>
  // ) => Observable<SendBird.OpenChannel> {
  //   return source =>
  //     source.pipe(
  //       switchMap(channel =>
  //         this.getChanenel(channel.url).pipe(
  //           switchMap(chan => this.enterChannel(chan)),
  //           map(() => channel)
  //         )
  //       )
  //     );
  // }

  private co<T>(fn: (...args: any[]) => void, ...args: any[]): Observable<T> {
    return new Observable(observer => fn(...args, this.callback(observer)));
  }

  private callback<T>(
    observer: Subscriber<T>
  ): (result: T, error: SendBird.SendBirdError) => void {
    return (response, error) => {
      if (error) {
        observer.error(error);
      }
      observer.next(response);
    };
  }

  private setupHandlers(sb: SendBird.SendBirdInstance) {
    this.channelHandler.onChannelChanged = this.onChannelChanged();
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

  private onMessageDelete(
    channel: SendBird.OpenChannel | SendBird.GroupChannel,
    messageId: string // TODO, this should be a number
  ): void {
    this.internalDeletedMessage$.next(messageId);
  }
}
