import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material.module';
import { LayoutEffects } from './+state/layout.effects';
import {
  initialState as layoutInitialState,
  layoutReducer,
  LAYOUT_FEATURE_KEY
} from './+state/layout.reducer';
import { ContainerInnerComponent } from './components/container-inner.component';
import { SideNavInnerComponent } from './components/side-nav-inner.component';
import { ContainerComponent } from './containers/container.component';
import { SideNavComponent } from './containers/side-nav.component';

const declarations = [ContainerComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature(LAYOUT_FEATURE_KEY, layoutReducer, {
      initialState: layoutInitialState
    }),
    EffectsModule.forFeature([LayoutEffects])
  ],
  declarations: [
    ...declarations,
    ContainerInnerComponent,
    SideNavComponent,
    SideNavInnerComponent
  ],
  exports: declarations
})
export class LayoutModule {}
