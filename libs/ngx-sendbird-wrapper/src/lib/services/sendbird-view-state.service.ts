import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { SendBirdService } from './sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class SendbirdViewStateService {
  private internalIsConnected$ = new BehaviorSubject<boolean>(false);
  private internalCurrentUser$ = new BehaviorSubject<SendBird.User>(null);
  private interalCurrentChannel$ = new BehaviorSubject<SendBird.OpenChannel>(
    null
  );

  private internalOpenChannels$ = new BehaviorSubject<SendBird.OpenChannel[]>(
    []
  );
  private internalMessagesForCurrentChannel$ = new BehaviorSubject<
    SendBird.UserMessage[]
  >([]);

  get isConnected$(): Observable<boolean> {
    return this.internalIsConnected$.asObservable();
  }

  get currentUser$(): Observable<SendBird.User> {
    return this.internalCurrentUser$
      .asObservable()
      .pipe(filter(user => !!user));
  }

  get currentChannel$(): Observable<SendBird.OpenChannel> {
    return this.interalCurrentChannel$
      .asObservable()
      .pipe(filter(channel => !!channel));
  }

  get messagesForCurrentChannel$(): Observable<SendBird.UserMessage[]> {
    return this.internalMessagesForCurrentChannel$.asObservable();
  }

  get openChannels$(): Observable<SendBird.OpenChannel[]> {
    return this.internalOpenChannels$.asObservable();
  }

  constructor(private sb: SendBirdService) {}

  connect(userId: string): Observable<SendBird.User> {
    return this.sb.connect(userId).pipe(
      tap(user => this.internalCurrentUser$.next(user)),
      tap(() => this.internalIsConnected$.next(true))
    );
  }

  createOpenChannel(): Observable<SendBird.OpenChannel> {
    const channels = this.internalOpenChannels$.value;

    return this.sb
      .createOpenChannel()
      .pipe(
        tap(channel => this.internalOpenChannels$.next([channel, ...channels]))
      );
  }

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

  getOpenChannels(): Observable<SendBird.OpenChannel[]> {
    return this.sb
      .getOpenChannels()
      .pipe(tap(channels => this.internalOpenChannels$.next(channels)));
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
      take(1),
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
