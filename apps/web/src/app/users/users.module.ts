import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersEffects } from './+state/users.effects';
import {
  initialState as usersInitialState,
  usersReducer,
  USERS_FEATURE_KEY
} from './+state/users.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer, {
      initialState: usersInitialState
    }),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: []
})
export class UsersModule {}
