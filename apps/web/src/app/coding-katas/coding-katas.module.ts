import { NgModule } from '@angular/core';
import { BowlingGameModule } from '@stottle-platform/bowling-game';
import { ManageContactsModule } from '@stottle-platform/manage-contacts';
import { SharedModule } from '../shared/shared.module';
import { CodingKatasRoutesModule } from './coding-katas-routes.module';
import { CodingKatasComponent } from './components/coding-katas.component';

@NgModule({
  imports: [
    SharedModule,
    BowlingGameModule.forFoot(),
    ManageContactsModule,
    CodingKatasRoutesModule
  ],
  declarations: [CodingKatasComponent]
})
export class CodingKatasModule {}
