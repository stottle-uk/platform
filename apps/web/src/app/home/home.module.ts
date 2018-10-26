import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeInnerComponent } from './components/home-inner.component';
import { HomeComponent } from './containers/home.component';
import { HomeRoutesModule } from './home-routes.module';

@NgModule({
  imports: [SharedModule, HomeRoutesModule],
  declarations: [HomeComponent, HomeInnerComponent]
})
export class HomeModule {}
