import { IHttpConnectionOptions } from '@aspnet/signalr';

export interface SignalrOptions {
  url: string;
  options: IHttpConnectionOptions;
  onCloseAutoReconnect: boolean;
}
