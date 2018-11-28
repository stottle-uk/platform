import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { hubConnectionBuilder, SIGNALR_CONNECTION_BULDER } from '@stottle-platform/ngx-signalr-wrapper';
import { RealtimeEffects } from './+state/realtime.effects';
import { initialState as realtimeInitialState, realtimeReducer, REALTIME_FEATURE_KEY } from './+state/realtime.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(REALTIME_FEATURE_KEY, realtimeReducer, {
      initialState: realtimeInitialState
    }),
    EffectsModule.forFeature([RealtimeEffects])
  ]
})
export class NgxSignalrWrapperNgrxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSignalrWrapperNgrxModule,
      providers: [
        {
          provide: SIGNALR_CONNECTION_BULDER,
          useFactory: hubConnectionBuilder
        }
      ]
    };
  }
}
