import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions
} from '@aspnet/signalr';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface SignalrOptions {
  url: string;
  options: IHttpConnectionOptions;
}

export const buildConnection = (hubConnectionBuilder: HubConnectionBuilder) => (
  source: Observable<SignalrOptions>
): Observable<HubConnection> =>
  source.pipe(
    map(opts => hubConnectionBuilder.withUrl(opts.url, opts.options)),
    map(buider => buider.build())
  );

export const throwErrorOnConnectionClosed = () => (
  source: Observable<HubConnection>
): Observable<HubConnection> =>
  new Observable<HubConnection>(observer =>
    source.subscribe(connection => {
      connection.onclose(error => observer.error(error));
      observer.next(connection);
    })
  );

export const startConnection = () => (
  source: Observable<HubConnection>
): Observable<void> =>
  source.pipe(switchMap(connection => from(connection.start())));
