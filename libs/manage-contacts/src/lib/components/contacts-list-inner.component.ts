import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ContactsDataSource } from './contacts-datasource';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stottle-platform-contacts-list-inner',
  template: `
  <div class="table-contacts-container">
    <table
      class="table-contacts"
      mat-table
      [dataSource]="dataSource"
      matSort
    >

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
        <td mat-cell *matCellDef="let row">{{ row.id }}</td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let row">{{ row.name }}</td>
      </ng-container>

      <ng-container matColumnDef="street">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Street</th>
        <td mat-cell *matCellDef="let row">{{ row.street }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
        <td mat-cell *matCellDef="let row">{{ row.email }}</td>
      </ng-container>

      <ng-container matColumnDef="phone">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Phone</th>
        <td mat-cell *matCellDef="let row">{{ row.phone }}</td>
      </ng-container>

      <ng-container matColumnDef="age">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Age</th>
        <td mat-cell *matCellDef="let row">{{ row.age }}</td>
      </ng-container>

      <ng-container matColumnDef="edit">
        <th mat-header-cell *matHeaderCellDef class="align-right">&nbsp;</th>
        <td mat-cell *matCellDef="let row" class="align-right">
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
  styles: [
    `
      .table-contacts {
        width: 100%;
      }

      .align-right {
        text-align: right;
      }
    `
  ]
})
export class ContactsListInnerComponent implements OnInit, OnDestroy {
  @Input() dataSource: ContactsDataSource;
  @Output() contactSelected = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [];
  subscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.setColumns(true);

    this.subscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map(result => this.setColumns(result.matches))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  setColumns(isSmallDevice: boolean): void {
    if (isSmallDevice) {
      this.displayedColumns = ['id', 'name', 'edit'];
    } else {
      this.displayedColumns = ['id', 'name', 'street', 'email', 'phone', 'age', 'edit'];
    }
  }
}
