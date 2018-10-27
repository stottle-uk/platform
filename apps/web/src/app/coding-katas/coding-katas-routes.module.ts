import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodingKatasComponent } from './components/coding-katas.component';

export const routes: Routes = [{ path: '', component: CodingKatasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingKatasRoutesModule {}
