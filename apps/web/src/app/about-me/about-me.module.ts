import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { EmploymentEffects } from './+state/employment/employment.effects';
import {
  employmentReducer,
  EMPLOYMENT_FEATURE_KEY
} from './+state/employment/employment.reducer';
import { AboutMeRoutesModule } from './about-me-routes.module';
import { AboutMePageInnerComponent } from './components/about-me-page-inner.component';
import { AboutMeComponent } from './components/about-me.component';
import { EmploymentInnerComponent } from './components/employment-inner.component';
import { EmploymentItemInnerComponent } from './components/employment-item-inner.component';
import { AboutMePageComponent } from './containers/about-me-page.component';
import { EmploymentItemComponent } from './containers/employment-item.component';
import { EmploymentComponent } from './containers/employment.component';
import { EmploymentService } from './services/employment.service';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(EMPLOYMENT_FEATURE_KEY, employmentReducer),
    EffectsModule.forFeature([EmploymentEffects]),
    AboutMeRoutesModule
  ],
  providers: [EmploymentService],
  declarations: [
    AboutMeComponent,
    AboutMePageComponent,
    AboutMePageInnerComponent,
    EmploymentComponent,
    EmploymentInnerComponent,
    EmploymentItemComponent,
    EmploymentItemInnerComponent
  ]
})
export class AboutMeModule {}
