import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CodingKatasRoutesModule } from './coding-katas-routes.module';
import { CodingKatasComponent } from './components/coding-katas.component';

@NgModule({
  imports: [SharedModule, CodingKatasRoutesModule],
  declarations: [CodingKatasComponent]
})
export class CodingKatasModule {}
