import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Store } from '@ngrx/store';
import { ContactsState } from '../+state/contacts.reducer';
import { ContactsDataSource } from './contacts-datasource';

@Component({
  selector: 'stottle-platform-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ContactsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private store: Store<ContactsState>) {}

  ngOnInit() {
    this.dataSource = new ContactsDataSource(
      this.store,
      this.paginator,
      this.sort
    );
    this.dataSource.getContacts();
  }
}
