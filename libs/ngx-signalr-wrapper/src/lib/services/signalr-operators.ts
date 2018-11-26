import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions
} from '@aspnet/signalr';
import { from, Observable, timer } from 'rxjs';
import { delayWhen, map, retryWhen, scan, switchMap } from 'rxjs/operators';

export interface SignalrOptions {
  url: string;
  options: IHttpConnectionOptions;
}

export const buildConnection = (opts: SignalrOptions) => (
  source: Observable<HubConnectionBuilder>
): Observable<HubConnection> =>
  source.pipe(
    map(connectionBuilder => connectionBuilder.withUrl(opts.url, opts.options)),
    map(buider => buider.build())
  );

export const startConnection = () => (
  source: Observable<HubConnection>
): Observable<void> =>
  source.pipe(
    switchMap(connection => from(connection.start())),
    retryWhen(errors =>
      errors.pipe(
        scan(errorCount => ++errorCount, 0),
        delayWhen(retryCount => timer(3000 * retryCount))
      )
    )
  );

export const onConnectionClosed = () => (
  source: Observable<HubConnection>
): Observable<HubConnection> =>
  new Observable<HubConnection>(observer =>
    source.subscribe(connection => {
      connection.onclose(error => {
        if (error) {
          observer.error(error);
        }
        observer.next(connection);
      });
    })
  );
