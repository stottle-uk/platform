import { Component } from '@angular/core';
import { Contact } from '../models/contacts.http';
import { ContactsStateService } from '../services/contacts-state.service';

@Component({
  selector: 'stottle-platform-contact-add',
  template: `
    <stottle-platform-contact-form
      [contact]="contact$ | async"
      [saving]="saving$ | async"
      (contactSaved)="onContactUpdated($event)"
      (cancel)="onCancel()"
    ></stottle-platform-contact-form>
  `,
  styles: []
})
export class ContactAddComponent {
  contact$ = this.contacts.selectedContact$;
  saving$ = this.contacts.loading$;

  constructor(private contacts: ContactsStateService) {}

  onContactUpdated(contact: Contact): void {
    this.contacts.add(contact);
    this.onCancel();
  }

  onCancel(): void {
    this.contacts.back();
  }
}
