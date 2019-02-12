import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
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

  disconnect(): Observable<Object> {
    return this.co(this.sb.disconnect.bind(this.sb));
  }

  getOpenChannels(): Observable<SendBird.OpenChannel[]> {
    const openChannelListQuery = this.sb.OpenChannel.createOpenChannelListQuery();
    return this.co(openChannelListQuery.next.bind(openChannelListQuery));
  }

  enterChannel(
    channel: SendBird.OpenChannel
  ): Observable<SendBird.OpenChannel> {
    return this.co(channel.enter.bind(channel));
  }

  exitChannel(channel: SendBird.OpenChannel): Observable<SendBird.OpenChannel> {
    return this.co(channel.exit.bind(channel));
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

  getChannelParticipants(
    channel: SendBird.OpenChannel
  ): Observable<SendBird.User[]> {
    const participantListQuery = channel.createParticipantListQuery();
    return this.co(participantListQuery.next.bind(participantListQuery));
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
}
