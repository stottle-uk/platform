import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home.component';
import { HomeRoutesModule } from './home-routes.module';

@NgModule({
  imports: [CommonModule, HomeRoutesModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
