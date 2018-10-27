import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BowlingGameRoutesModule } from './bowling-game-routes.module';
import { BowlingGameComponent } from './components/bowling-game.component';
import { BowlingGameRollsService } from './services/bowling-game-rolls.service';

@NgModule({
  imports: [CommonModule, BowlingGameRoutesModule],
  declarations: [BowlingGameComponent]
})
export class BowlingGameModule {
  static forFoot(): ModuleWithProviders {
    return {
      ngModule: BowlingGameModule,
      providers: [BowlingGameRollsService]
    };
  }
}
