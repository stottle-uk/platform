import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Store } from '@ngrx/store';
import { fromContactsActions } from '../+state/contacts.actions';
import { ContactsState } from '../+state/contacts.reducer';
import { ContactsDataSource } from './contacts-datasource';

@Component({
  selector: 'stottle-platform-contacts',
  template: `

  <router-outlet></router-outlet>

  <div class="mat-elevation-z8">
    <table
      mat-table
      [dataSource]="dataSource"
      matSort
      aria-label="Elements"
    >

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
        <td mat-cell *matCellDef="let row">{{ row.id }}</td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let row">{{ row.name }}</td>
      </ng-container>

      <ng-container matColumnDef="edit">
        <th mat-header-cell *matHeaderCellDef>Edit</th>
        <td mat-cell *matCellDef="let row">
          <button mat-mini-fab (click)="editContact(row.id)">
            <mat-icon>edit</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

  </div>
  `
})
export class ContactsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ContactsDataSource;

  displayedColumns = ['id', 'name', 'edit'];

  constructor(private store: Store<ContactsState>) {}

  ngOnInit() {
    this.dataSource = new ContactsDataSource(this.store);
    this.dataSource.getContacts();
  }

  editContact(id: number): void {
    this.store.dispatch(new fromContactsActions.EditContact({ id }));
  }
}
