import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home.component';
import { HomeRoutesModule } from './home-routes.module';

@NgModule({
  imports: [SharedModule, HomeRoutesModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
