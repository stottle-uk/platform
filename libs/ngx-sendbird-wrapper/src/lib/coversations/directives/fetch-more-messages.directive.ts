import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConversationsViewStateService } from '../services/conversations-view-state.service';

@Directive({
  selector: '[stottleFetchMoreMessages]'
})
export class FetchMoreMessagesDirective implements OnDestroy {
  private destroy$ = new Subject();

  constructor(private vs: ConversationsViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('click')
  getMore(): void {
    this.vs
      .getMoreMessagesForCurrentChannel()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
