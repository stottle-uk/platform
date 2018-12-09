import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ContactsDataSource } from './contacts-datasource';

@Component({
  selector: 'stottle-platform-contacts-list-inner',
  template: `
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
          <button mat-mini-fab (click)="contactSelected.emit(row.id)">
            <mat-icon>edit</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

  </div>
  `,
  styles: []
})
export class ContactsListInnerComponent {
  @Input() dataSource: ContactsDataSource;
  @Output() contactSelected = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['id', 'name', 'edit'];
}
