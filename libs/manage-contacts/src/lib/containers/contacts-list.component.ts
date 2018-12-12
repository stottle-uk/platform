import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromContactsActions } from '../+state/contacts.actions';
import { ContactsState } from '../+state/contacts.reducer';
import { ContactsDataSource } from '../components/contacts-datasource';

@Component({
  selector: 'stottle-platform-contacts-list',
  template: `
    <stottle-platform-contacts-list-inner
      [dataSource]="dataSource"
      (contactSelected)="onContactSelected($event)"
      (newContact)="onNewContact()"
    ></stottle-platform-contacts-list-inner>
  `,
  styles: []
})
export class ContactsListComponent implements OnInit {
  dataSource: ContactsDataSource;

  constructor(private store: Store<ContactsState>) {}

  ngOnInit() {
    this.dataSource = new ContactsDataSource(this.store);
    this.store.dispatch(
      new fromContactsActions.GetContactsStart({
        skip: 0,
        take: 10,
        sortOrder: 'ASC'
      })
    );
  }

  onContactSelected(id: number): void {
    this.store.dispatch(new fromContactsActions.UpdateContact({ id }));
  }

  onNewContact(): void {
    this.store.dispatch(new fromContactsActions.AddContact());
  }
}
