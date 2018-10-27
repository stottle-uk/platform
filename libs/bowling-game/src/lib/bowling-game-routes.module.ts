import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BowlingGameComponent } from './components/bowling-game.component';

export const routes: Routes = [
  { path: 'bowling-game', component: BowlingGameComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BowlingGameRoutesModule {}
