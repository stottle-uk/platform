import { Component, OnInit } from '@angular/core';
import { Contact } from '../+state/contacts.model';
import { contactsQuery } from '../+state/contacts.selectors';
import { Store } from '@ngrx/store';
import { ContactsState } from '../+state/contacts.reducer';
import { fromContactsActions } from '../+state/contacts.actions';

@Component({
  selector: 'stottle-contact-add',
  template: `
    <stottle-platform-contact-form
      [saving]="saving$ | async"
      (contactSaved)="onContactUpdated($event)"
      (cancel)="onCancel()"
    ></stottle-platform-contact-form>
  `,
  styles: []
})
export class ContactAddComponent {
  saving$ = this.store.select(contactsQuery.getIsLoading);

  constructor(private store: Store<ContactsState>) { }

  onContactUpdated(contact: Contact): void {
    this.store.dispatch(
      new fromContactsActions.AddContactStart({ contact })
    );
  }

  onCancel(): void {
    this.store.dispatch(new fromContactsActions.AddContactCancel());
  }

}
