import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as SendBird from 'sendbird';

export const SEND_BIRD = new InjectionToken<SendBird.SendBirdInstance>(
  'SEND_BIRD'
);

@Injectable({
  providedIn: 'root'
})
export class SendBirdService {
  constructor(@Inject(SEND_BIRD) private sb: SendBird.SendBirdInstance) {}

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
    channel: SendBird.OpenChannel
  ): Observable<SendBird.UserMessage[]> {
    var messageListQuery = channel.createPreviousMessageListQuery();
    messageListQuery.limit = 30;

    return this.co(messageListQuery.load.bind(messageListQuery));
  }

  sendMessage(
    message: string,
    channel: SendBird.OpenChannel
  ): Observable<SendBird.UserMessage> {
    return this.co(channel.sendUserMessage.bind(channel), message);
  }

  private getChanenel(channelUrl: string): Observable<SendBird.OpenChannel> {
    return new Observable(observer =>
      this.sb.OpenChannel.getChannel(channelUrl, this.callback(observer))
    );
  }

  private createOpenChannel(): Observable<SendBird.OpenChannel> {
    return new Observable(observer =>
      this.sb.OpenChannel.createChannel(this.callback(observer))
    );
  }

  getAndEnterChannel(): (
    source: Observable<SendBird.OpenChannel>
  ) => Observable<SendBird.OpenChannel> {
    return source =>
      source.pipe(
        switchMap(channel =>
          this.getChanenel(channel.url).pipe(
            switchMap(chan => this.enterChannel(chan)),
            map(() => channel)
          )
        )
      );
  }

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
}
