import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutesModule } from './admin-routes.module';
import { DashboardInnerComponent } from './components/dashboard-inner.component';
import { DashboardComponent } from './containers/dashboard.component';

@NgModule({
  imports: [CommonModule, FormsModule, AdminRoutesModule],
  declarations: [DashboardComponent, DashboardInnerComponent]
})
export class AdminModule {}
