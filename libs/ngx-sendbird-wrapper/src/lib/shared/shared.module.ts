import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericListComponent } from '../components/generic-list.component';
import { GenericDirective } from '../directives/generic.directive';

const modules = [CommonModule, ReactiveFormsModule];
const declarations = [GenericDirective, GenericListComponent];

@NgModule({
  imports: [...modules],
  declarations: [declarations],
  exports: [...modules, declarations]
})
export class SharedModule {}
