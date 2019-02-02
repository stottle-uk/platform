import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { SendBirdService } from './sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class SendbirdViewStateService {
  private interalCurrentChannel$ = new BehaviorSubject<SendBird.OpenChannel>(
    null
  );

  private internalMessagesForCurrentChannel$ = new BehaviorSubject<
    SendBird.UserMessage[]
  >([]);

  get currentChannel$(): Observable<SendBird.OpenChannel> {
    return this.interalCurrentChannel$
      .asObservable()
      .pipe(filter(channel => !!channel));
  }

  get messagesForCurrentChannel$(): Observable<SendBird.UserMessage[]> {
    return this.internalMessagesForCurrentChannel$.asObservable();
  }

  get openChannels$(): Observable<SendBird.OpenChannel[]> {
    return this.sb.getOpenChannels();
  }

  constructor(private sb: SendBirdService) {}

  enterChannel(
    channel: SendBird.OpenChannel
  ): Observable<SendBird.OpenChannel> {
    return this.sb
      .enterChannel(channel)
      .pipe(tap(() => this.setCurrentChannel(channel)));
  }

  setCurrentChannel(channel: SendBird.OpenChannel): void {
    this.interalCurrentChannel$.next(channel);
  }

  getMessagesForCurrentChannel(): Observable<SendBird.UserMessage[]> {
    return this.currentChannel$.pipe(
      switchMap(channel =>
        this.sb
          .getPreviousMessages(channel)
          .pipe(
            tap(messages =>
              this.internalMessagesForCurrentChannel$.next(messages)
            )
          )
      )
    );
  }

  sendMessage(message: string): Observable<SendBird.UserMessage> {
    const messages = this.internalMessagesForCurrentChannel$.value;

    return this.currentChannel$.pipe(
      switchMap(channel =>
        this.sb
          .sendMessage(message, channel)
          .pipe(
            tap(newMessage =>
              this.internalMessagesForCurrentChannel$.next([
                ...messages,
                newMessage
              ])
            )
          )
      )
    );
  }
}
