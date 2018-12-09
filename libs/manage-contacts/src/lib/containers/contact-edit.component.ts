import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromContactsActions } from '../+state/contacts.actions';
import { Contact } from '../+state/contacts.model';
import { ContactsState } from '../+state/contacts.reducer';
import { contactsQuery } from '../+state/contacts.selectors';

@Component({
  selector: 'stottle-platform-contact-edit',
  template: `
    <stottle-platform-contact-edit-inner
      [contact]="contact$ | async"
      (contactUpdated)="onContactUpdated($event)"
      (cancel)="onCancel()"
    ></stottle-platform-contact-edit-inner>
  `,
  styles: []
})
export class ContactEditComponent {
  contact$ = this.store.select(contactsQuery.getSelectedContact);

  constructor(private store: Store<ContactsState>) {}

  onContactUpdated(contact: Contact): void {
    this.store.dispatch(
      new fromContactsActions.UpdateContactStart({ contact })
    );
  }

  onCancel(): void {
    this.store.dispatch(new fromContactsActions.UpdateContactCancel());
  }
}
