import { Inject, Injectable } from '@angular/core';
import { from, Observable, of, timer } from 'rxjs';
import {
  delayWhen,
  map,
  retryWhen,
  scan,
  switchMap,
  tap
} from 'rxjs/operators';
import { SIGNALR_CONNECTION_BULDER } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;

  constructor(
    @Inject(SIGNALR_CONNECTION_BULDER)
    private hubConnectionBuilder: signalR.HubConnectionBuilder
  ) {}

  start(accessToken: string): Observable<void> {
    return of(accessToken).pipe(
      map(token =>
        this.hubConnectionBuilder.withUrl('', {
          accessTokenFactory: () => token
        })
      ),
      map(builder => builder.build()),
      tap(connection => (this.hubConnection = connection)),
      switchMap(connection => this.handleOnClose(connection)),
      switchMap(connection => from(connection.start())),
      retryWhen(errors =>
        errors.pipe(
          scan(errorCount => ++errorCount, 0),
          delayWhen(retryCount => timer(3000 * retryCount))
        )
      )
    );
  }

  stop(): Observable<void> {
    return from(this.hubConnection.stop());
  }

  private handleOnClose(
    connection: signalR.HubConnection
  ): Observable<signalR.HubConnection> {
    return new Observable<signalR.HubConnection>(observer => {
      connection.onclose(error => observer.error(error));
      observer.next(connection);
    });
  }
}
