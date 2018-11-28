import { ModuleWithProviders, NgModule } from '@angular/core';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { SIGNALR_CONNECTION_BULDER } from './services/tokens';

export function hubConnectionBuilder() {
  return new HubConnectionBuilder().configureLogging(LogLevel.Trace);
}

@NgModule({})
export class NgxSignalrWrapperModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSignalrWrapperModule,
      providers: [
        {
          provide: SIGNALR_CONNECTION_BULDER,
          useFactory: hubConnectionBuilder
        }
      ]
    };
  }
}
