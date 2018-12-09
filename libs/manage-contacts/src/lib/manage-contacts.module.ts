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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContactsEffects } from './+state/contacts.effects';
import {
  contactsReducer,
  CONTACTS_FEATURE_KEY
} from './+state/contacts.reducer';
import { ContactEditInnerComponent } from './components/contact-edit-inner.component';
import { ContactsListInnerComponent } from './components/contacts-list-inner.component';
import { ContactsComponent } from './components/contacts.component';
import { ContactEditComponent } from './containers/contact-edit.component';
import { ContactsListComponent } from './containers/contacts-list.component';
import { ManageContactsRoutesModule } from './manage-contacts-routes.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature(CONTACTS_FEATURE_KEY, contactsReducer),
    EffectsModule.forFeature([ContactsEffects]),
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
    ContactEditComponent,
    ContactEditInnerComponent
  ]
})
export class ManageContactsModule {}
