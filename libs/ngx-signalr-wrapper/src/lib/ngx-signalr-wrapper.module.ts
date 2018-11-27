import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { SIGNALR_CONNECTION_BULDER } from './services/tokens';

export function hubConnectionBuilder() {
  return new HubConnectionBuilder().configureLogging(LogLevel.Trace);
}

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: SIGNALR_CONNECTION_BULDER,
      useFactory: hubConnectionBuilder
    }
  ]
})
export class NgxSignalrWrapperModule {}
