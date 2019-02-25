import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ConnectionDirective } from './directives/connection.directive';

const declarations = [ConnectionDirective];

@NgModule({
  declarations: [declarations],
  imports: [SharedModule],
  exports: [declarations]
})
export class ConnectionModule {}
