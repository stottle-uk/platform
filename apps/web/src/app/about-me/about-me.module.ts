import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutMeRoutesModule } from './about-me-routes.module';
import { AboutMeComponent } from './components/about-me.component';

@NgModule({
  imports: [SharedModule, AboutMeRoutesModule],
  declarations: [AboutMeComponent]
})
export class AboutMeModule {}
