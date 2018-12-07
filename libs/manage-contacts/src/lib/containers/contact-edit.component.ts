import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromContactsActions } from '../+state/contacts.actions';
import { Contact } from '../+state/contacts.model';
import { ContactsState } from '../+state/contacts.reducer';
import { contactsQuery } from '../+state/contacts.selectors';

@Component({
  selector: 'stottle-contact-edit',
  template: `
    <stottle-contact-edit-inner
      [contact]="contact$ | async"
      (contactUpdated)="onContactUpdated($event)"
    ></stottle-contact-edit-inner>
  `,
  styles: []
})
export class ContactEditComponent implements OnInit {
  contact$ = this.store.select(contactsQuery.getSelectedContact);

  constructor(private store: Store<ContactsState>) {}

  ngOnInit() {}

  onContactUpdated(contact: Contact): void {
    this.store.dispatch(
      new fromContactsActions.UpdateContactStart({ contact })
    );
  }
}
