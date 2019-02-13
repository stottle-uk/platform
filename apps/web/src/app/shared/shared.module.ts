import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

const modules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MaterialModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule {}
