import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersViewStateService } from '../services/users-view-state.service';

@Component({
  selector: 'stottle-users-list',
  template: `
    <stottle-users-list-inner [users]="applicationUsers$ | async">
    </stottle-users-list-inner>
  `,
  styles: []
})
export class UsersListComponent implements OnInit, OnDestroy {
  applicationUsers$ = this.vs.applicationUsers$;

  private destroy$ = new Subject();

  constructor(private vs: UsersViewStateService) {}

  ngOnInit(): void {
    this.vs
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
