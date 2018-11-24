import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as si from '@aspnet/signalr';
import { SIGNALR_CONNECTION_BULDER } from './services/tokens';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: SIGNALR_CONNECTION_BULDER,
      useFactory: () => {
        return new si.HubConnectionBuilder().configureLogging(
          si.LogLevel.Trace
        );
      }
    }
  ]
})
export class NgxSignalrWrapperModule {}
