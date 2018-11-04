import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutMeRoutesModule } from './about-me-routes.module';
import { AboutMePageInnerComponent } from './components/about-me-page-inner.component';
import { AboutMeComponent } from './components/about-me.component';
import { EmploymentInnerComponent } from './components/employment-inner.component';
import { EmploymentItemInnerComponent } from './components/employment-item-inner.component';
import { AboutMePageComponent } from './containers/about-me-page.component';
import { EmploymentItemComponent } from './containers/employment-item.component';
import { EmploymentComponent } from './containers/employment.component';

@NgModule({
  imports: [SharedModule, AboutMeRoutesModule],
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
