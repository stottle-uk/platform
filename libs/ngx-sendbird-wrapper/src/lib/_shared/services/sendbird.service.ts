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
  get instance(): SendBird.SendBirdInstance {
    return this.sb;
  }

  constructor(@Inject(SEND_BIRD) private sb: SendBird.SendBirdInstance) {}

  connect(userId: string): Observable<SendBird.User> {
    this.sb.setChannelInvitationPreference(true, function(response, error) {
      if (error) {
        return;
      }
    });

    return this.co(this.sb.connect.bind(this.sb), userId);
  }

  disconnect(): Observable<Object> {
    return this.co(this.sb.disconnect.bind(this.sb));
  }

  getApplicationUsers(
    query: SendBird.ApplicationUserListQuery
  ): Observable<SendBird.User[]> {
    return this.co(query.next.bind(query));
  }

  getOpenChannels(): Observable<SendBird.OpenChannel[]> {
    const openChannelListQuery = this.sb.OpenChannel.createOpenChannelListQuery();
    return this.co(openChannelListQuery.next.bind(openChannelListQuery));
  }

  getGroupChannels(): Observable<SendBird.GroupChannel[]> {
    const groupChannelListQuery = this.sb.GroupChannel.createMyGroupChannelListQuery();
    groupChannelListQuery.includeEmpty = true;
    return this.co(groupChannelListQuery.next.bind(groupChannelListQuery));
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
    channel: SendBird.OpenChannel | SendBird.GroupChannel
  ): Observable<SendBird.UserMessage> {
    return this.co(channel.sendUserMessage.bind(channel), message);
  }

  sendFileMessage(
    file: File,
    channel: SendBird.OpenChannel | SendBird.GroupChannel
  ): Observable<SendBird.FileMessage> {
    return this.co(channel.sendFileMessage.bind(channel), file);
  }

  updateMessage(
    channel: SendBird.OpenChannel | SendBird.GroupChannel,
    messageId: number,
    message: string,
    data: string,
    customType: string
  ): Observable<SendBird.UserMessage> {
    return this.co(
      channel.updateUserMessage.bind(channel),
      messageId,
      message,
      data,
      customType
    );
  }

  deleteMessage(
    message: SendBird.FileMessage | SendBird.UserMessage,
    channel: SendBird.OpenChannel | SendBird.GroupChannel
  ): Observable<any> {
    return this.co(channel.deleteMessage.bind(channel), message);
  }

  getOpenChannel(channelUrl: string): Observable<SendBird.OpenChannel> {
    return this.co(this.sb.OpenChannel.getChannel.bind(this.sb), channelUrl);
  }

  getGroupChannel(channelUrl: string): Observable<SendBird.GroupChannel> {
    return this.co(this.sb.GroupChannel.getChannel.bind(this.sb), channelUrl);
  }

  createOpenChannel(
    name: string,
    coverUrlOrImageFile: string | File,
    data: string,
    operatorUserIds: Array<string> | string,
    customType: string
  ): Observable<SendBird.OpenChannel> {
    return this.co(
      this.sb.OpenChannel.createChannel.bind(this.sb),
      name,
      coverUrlOrImageFile,
      data,
      operatorUserIds,
      customType
    );
  }

  createGroupChannel(
    userIds: string[],
    isDistinct: boolean,
    name: string,
    coverUrlOrImageFile: string | File,
    data: string,
    customType: string
  ): Observable<SendBird.GroupChannel> {
    return this.co(
      this.sb.GroupChannel.createChannelWithUserIds.bind(this.sb),
      userIds,
      isDistinct,
      name,
      coverUrlOrImageFile,
      data,
      customType
    );
  }

  updateOpenChannel(
    channel: SendBird.OpenChannel,
    name: string,
    coverUrl: string,
    data: string,
    operatorUserIds: Array<string> | string,
    customType: string
  ): Observable<SendBird.OpenChannel> {
    return this.co(
      channel.updateChannel.bind(channel),
      name,
      coverUrl,
      data,
      operatorUserIds,
      customType
    );
  }

  getChannelParticipants(
    query: SendBird.ParticipantListQuery
  ): Observable<SendBird.User[]> {
    return this.co(query.next.bind(query));
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
