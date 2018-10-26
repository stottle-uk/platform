import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutesModule } from './admin-routes.module';
import { DashboardInnerComponent } from './components/dashboard-inner.component';
import { DashboardComponent } from './containers/dashboard.component';

@NgModule({
  imports: [SharedModule, FormsModule, AdminRoutesModule],
  declarations: [DashboardComponent, DashboardInnerComponent]
})
export class AdminModule {}
