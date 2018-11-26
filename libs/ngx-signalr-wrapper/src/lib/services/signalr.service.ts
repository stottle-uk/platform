import { Inject, Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions
} from '@aspnet/signalr';
import { BehaviorSubject, from, Observable, of, timer } from 'rxjs';
import { delayWhen, filter, retryWhen, scan, take, tap } from 'rxjs/operators';
import {
  buildConnection,
  SignalrOptions,
  startConnection,
  throwErrorOnConnectionClosed
} from './signalr-operators';
import { SIGNALR_CONNECTION_BULDER } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: HubConnection;
  private reconnect$ = new BehaviorSubject<boolean>(true);
  private isConnected$ = new BehaviorSubject<boolean>(false);
  private options$ = new BehaviorSubject<SignalrOptions>({
    options: {},
    url: ''
  });

  constructor(
    @Inject(SIGNALR_CONNECTION_BULDER)
    private hubConnectionBuilder: HubConnectionBuilder
  ) {}

  start(url: string, options: IHttpConnectionOptions): Observable<void> {
    this.reconnect$.next(true);

    return of({ url, options }).pipe(
      take(1),
      tap(options => this.options$.next(options)),
      filter(() => this.reconnect$.value),
      buildConnection(this.hubConnectionBuilder),
      throwErrorOnConnectionClosed(),
      tap(connection => (this.hubConnection = connection)),
      startConnection(),
      tap(() => this.isConnected$.next(true)),
      retryWhen(errors =>
        errors.pipe(
          scan(errorCount => ++errorCount, 0),
          delayWhen(retryCount => timer(3000 * retryCount))
        )
      )
    );
  }

  stop(reconnect: boolean): Observable<void> {
    return from(this.hubConnection.stop()).pipe(
      tap(() => this.reconnect$.next(reconnect))
    );
  }

  stopAndStart(url: string, options: IHttpConnectionOptions): Observable<void> {
    if (this.isConnected$.value) {
      return this.stop(true);
    }
    return this.start(url, options);
  }

  invoke(methodName: string, ...args: any[]): Observable<void> {
    return from(this.hubConnection.invoke(methodName, args));
  }

  setupListners(): Observable<void> {
    return of(
      this.hubConnection.on('ReceiveMessage', (result, tt) => {
        console.log(result);
      })
    );
  }
}
