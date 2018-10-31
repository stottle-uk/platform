import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './components/callback.component';

export const routes: Routes = [
  { path: 'callback', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class NgxAuth0WrapperNgrxRoutesModule {}
