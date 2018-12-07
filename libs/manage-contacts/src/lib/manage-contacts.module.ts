import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContactsEffects } from './+state/contacts.effects';
import {
  contactsReducer,
  CONTACTS_FEATURE_KEY
} from './+state/contacts.reducer';
import { ContactsComponent } from './components/contacts.component';
import { ManageContactsRoutesModule } from './manage-contacts-routes.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(CONTACTS_FEATURE_KEY, contactsReducer),
    EffectsModule.forFeature([ContactsEffects]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ManageContactsRoutesModule
  ],
  declarations: [ContactsComponent]
})
export class ManageContactsModule {}
