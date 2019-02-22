import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { EntityDataService } from 'ngrx-data';
import { ContactFormComponent } from './components/contact-form.component';
import { ContactsListInnerComponent } from './components/contacts-list-inner.component';
import { ContactsComponent } from './components/contacts.component';
import { ContactAddComponent } from './containers/contact-add.component';
import { ContactEditComponent } from './containers/contact-edit.component';
import { ContactsListComponent } from './containers/contacts-list.component';
import { ManageContactsRoutesModule } from './manage-contacts-routes.module';
import { ContactsService } from './services/contacts.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    ManageContactsRoutesModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  declarations: [
    ContactsComponent,
    ContactsListComponent,
    ContactsListInnerComponent,
    ContactAddComponent,
    ContactEditComponent,
    ContactFormComponent
  ]
})
export class ManageContactsModule {
  constructor(
    entityDataService: EntityDataService,
    contactsService: ContactsService
  ) {
    entityDataService.registerService('Contact', contactsService);
  }
}
