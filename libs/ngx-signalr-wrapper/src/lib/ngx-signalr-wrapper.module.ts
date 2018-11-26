import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { SIGNALR_CONNECTION_BULDER } from './services/tokens';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: SIGNALR_CONNECTION_BULDER,
      useFactory: () => {
        return new HubConnectionBuilder().configureLogging(LogLevel.Trace);
      }
    }
  ]
})
export class NgxSignalrWrapperModule {}
