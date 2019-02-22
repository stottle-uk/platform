import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsDataSource } from '../components/contacts-datasource';
import { ContactsStateService } from '../services/contacts-state.service';

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

  constructor(
    private contacts: ContactsStateService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataSource = new ContactsDataSource(this.contacts);
    this.contacts.getAll();
  }

  onContactSelected(id: number): void {
    this.contacts.goToSelectedContact(id, this.activatedRoute);
  }

  onNewContact(): void {
    this.contacts.goToNewContactForm(this.activatedRoute);
  }
}
