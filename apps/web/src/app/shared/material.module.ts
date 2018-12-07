import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
