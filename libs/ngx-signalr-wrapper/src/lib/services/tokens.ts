import { InjectionToken } from '@angular/core';

export const SIGNALR_CONNECTION_BULDER = new InjectionToken<
  signalR.HubConnectionBuilder
>('SIGNALR_CONNECTION_BULDER');
