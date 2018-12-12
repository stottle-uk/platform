import { DataSource } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from '../+state/contacts.model';
import { ContactsState } from '../+state/contacts.reducer';
import { contactsQuery } from '../+state/contacts.selectors';

export class ContactsDataSource extends DataSource<Contact> {
  constructor(private store: Store<ContactsState>) {
    super();
  }

  connect(): Observable<Contact[]> {
    return this.store.select(contactsQuery.getAllContacts);
  }

  disconnect() {}
}
