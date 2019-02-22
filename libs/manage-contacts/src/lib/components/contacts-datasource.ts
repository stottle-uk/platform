import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Contact } from '../models/contacts.http';
import { ContactsStateService } from '../services/contacts-state.service';

export class ContactsDataSource extends DataSource<Contact> {
  constructor(private store: ContactsStateService) {
    super();
  }

  connect(): Observable<Contact[]> {
    return this.store.entities$;
  }

  disconnect() {}
}
