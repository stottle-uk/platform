import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@stottle-platform/ngx-auth0-wrapper-ngrx';
import { SignalrService } from '@stottle-platform/ngx-signalr-wrapper';
import { Observable, Subscriber } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';

export const SEND_BIRD = new InjectionToken<SendBird.SendBirdInstance>(
  'sendbird'
);

@Component({
  selector: 'stottle-platform-root',
  template: `
    <stottle-container></stottle-container>
  `
})
export class AppComponent implements OnInit {
  title = 'stottle.uk';

  constructor(
    private store: Store<AuthState>,
    private signalrService: SignalrService,
    @Inject(SEND_BIRD) private sb: SendBird.SendBirdInstance
  ) {}

  ngOnInit(): void {
    this.connect('first_user')
      .pipe(
        switchMap(user => this.listOfChannels()),
        tap(console.log),
        map(channels => channels[0]),
        this.getAndEnterChannel(),
        switchMap(channel => this.getPreviousMessages(channel))
        // switchMap(channel => this.sendMessage('another message', channel))
      )
      .subscribe(console.log, console.error);
  }

  private listOfChannels(): Observable<SendBird.OpenChannel[]> {
    return new Observable(observer => {
      var openChannelListQuery = this.sb.OpenChannel.createOpenChannelListQuery();
      openChannelListQuery.next(this.callback(observer));
    });
  }

  private getPreviousMessages(channel: SendBird.OpenChannel): Observable<any> {
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

  private enterChannel(
    channel: SendBird.OpenChannel
  ): Observable<SendBird.OpenChannel> {
    return new Observable(observer => channel.enter(this.callback(observer)));
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

  private connect(userId: string): Observable<SendBird.User> {
    return new Observable(observer =>
      this.sb.connect(userId, this.callback(observer))
    );
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

  closeConnection(): void {
    this.signalrService.stop(true).subscribe();
  }
}
