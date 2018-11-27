import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RealtimeEffects } from './+state/realtime.effects';
import {
  initialState as realtimeInitialState,
  realtimeReducer,
  REALTIME_FEATURE_KEY
} from './+state/realtime.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(REALTIME_FEATURE_KEY, realtimeReducer, {
      initialState: realtimeInitialState
    }),
    EffectsModule.forFeature([RealtimeEffects])
  ]
})
export class NgxSignalrWrapperNgrxModule {}
