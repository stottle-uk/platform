import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me.component';
import { AboutMePageComponent } from './containers/about-me-page.component';
import { EmploymentItemComponent } from './containers/employment-item.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutMeComponent,
    children: [
      {
        path: '',
        component: AboutMePageComponent
      },
      {
        path: ':id',
        component: EmploymentItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMeRoutesModule {}
