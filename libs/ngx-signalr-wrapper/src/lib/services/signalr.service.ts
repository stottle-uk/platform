import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { catchError, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { SignalrOptions } from '../models/signalr-connection';
import {
  buildConnection,
  onConnectionClosed,
  startConnection
} from './signalr-operators';
import { SIGNALR_CONNECTION_BULDER } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: HubConnection;
  private isConnected$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(SIGNALR_CONNECTION_BULDER)
    private hubConnectionBuilder: HubConnectionBuilder
  ) {}

  start(signalrOptions: SignalrOptions): Observable<void> {
    return this.stop(true).pipe(
      first(tryReconnect => tryReconnect),
      switchMap(() =>
        of(this.hubConnectionBuilder).pipe(
          buildConnection(signalrOptions),
          tap(connection => (this.hubConnection = connection)),
          startConnection(),
          tap(() => this.isConnected$.next(true))
        )
      )
    );
  }

  stop(tryReconnect: boolean): Observable<boolean> {
    if (!this.isConnected$.value) {
      return of(tryReconnect);
    }

    return from(this.hubConnection.stop()).pipe(map(() => tryReconnect));
  }

  onClose(): Observable<HubConnection> {
    return this.isConnected$.pipe(
      filter(isConnected => isConnected),
      switchMap(() => of(this.hubConnection).pipe(onConnectionClosed())),
      tap(() => this.isConnected$.next(false)),
      catchError(error => {
        this.isConnected$.next(false);
        return throwError(error);
      })
    );
  }

  invoke(methodName: string, ...args: any[]): Observable<void> {
    return this.isConnected$.pipe(
      filter(isConnected => isConnected),
      switchMap(() => from(this.hubConnection.invoke(methodName, args)))
    );
  }

  setupListners(): Observable<void> {
    return of(
      this.hubConnection.on('ReceiveMessage', (result, tt) => {
        console.log(result);
      })
    );
  }
}
