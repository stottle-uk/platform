import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReceievedInvitationsViewStateService } from '../services/receieved-invitations-view-state.service';

@Component({
  selector: 'stottle-receieved-invitations',
  template: `
    <stottle-receieved-invitations-inner [invitations]="invitations$ | async">
    </stottle-receieved-invitations-inner>
  `,
  styles: []
})
export class ReceievedInvitationsComponent implements OnInit, OnDestroy {
  invitations$ = this.vs.receivedInvitations$;

  destroy$ = new Subject();

  constructor(private vs: ReceievedInvitationsViewStateService) {}

  ngOnInit(): void {
    this.vs
      .setupHandlers()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
