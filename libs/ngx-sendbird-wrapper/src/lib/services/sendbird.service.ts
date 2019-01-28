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
    return this.createObservable(this.sb.connect.bind(this.sb), userId);
  }

  getOpenChannels(): Observable<SendBird.OpenChannel[]> {
    var openChannelListQuery = this.sb.OpenChannel.createOpenChannelListQuery();

    return this.createObservable(
      openChannelListQuery.next.bind(openChannelListQuery)
    );
    // return new Observable(observer => {
    //   openChannelListQuery.next(this.callback(observer));
    // });
  }

  enterChannel(
    channel: SendBird.OpenChannel
  ): Observable<SendBird.OpenChannel> {
    return new Observable(observer => channel.enter(this.callback(observer)));
  }

  getPreviousMessages(
    channel: SendBird.OpenChannel
  ): Observable<
    SendBird.UserMessage[] | SendBird.FileMessage[] | SendBird.AdminMessage[]
  > {
    return new Observable(observer => {
      var messageListQuery = channel.createPreviousMessageListQuery();
      messageListQuery.limit = 30;
      messageListQuery.reverse = true;
      messageListQuery.load(this.callback(observer));
    });
  }

  private sendMessage(message: string, channel: SendBird.OpenChannel): any {
    return new Observable(observer => {
      channel.sendUserMessage(message, this.callback(observer));
    });
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

  private getAndEnterChannel(): (
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

  private createObservable<T>(
    fn: (...args: any[]) => void,
    ...args: any[]
  ): Observable<T> {
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
