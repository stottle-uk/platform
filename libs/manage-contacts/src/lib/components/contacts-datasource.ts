import { DataSource } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromContactsActions } from '../+state/contacts.actions';
import { Contact } from '../+state/contacts.model';
import { ContactsState } from '../+state/contacts.reducer';
import { contactsQuery } from '../+state/contacts.selectors';

export class ContactsDataSource extends DataSource<Contact> {
  constructor(private store: Store<ContactsState>) {
    super();
  }

  connect(): Observable<Contact[]> {
    return this.store.select(contactsQuery.selectAllContacts);
  }

  disconnect() {}

  getContacts(): void {
    this.store.dispatch(
      new fromContactsActions.GetContactsStart({
        skip: 0,
        take: 10,
        sortOrder: 'ASC'
      })
    );
  }
}
