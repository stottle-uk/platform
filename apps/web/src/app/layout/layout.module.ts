import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { NavbarInnerComponent } from './components/navbar-inner.component';
import { NavbarComponent } from './containers/navbar.component';

const declarations = [NavbarComponent];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  declarations: [...declarations, NavbarInnerComponent],
  exports: declarations
})
export class LayoutModule {}
