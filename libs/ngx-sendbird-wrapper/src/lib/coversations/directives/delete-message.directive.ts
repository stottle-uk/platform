import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConversationsViewStateService } from '../services/conversations-view-state.service';

@Directive({
  selector: '[stottleDeleteMessage]'
})
export class DeleteMessageDirective implements OnDestroy {
  @Input()
  message: SendBird.UserMessage | SendBird.FileMessage;

  private destroy$ = new Subject();

  constructor(private vs: ConversationsViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('click')
  onClick(): void {
    this.vs
      .deleteMessage(this.message)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
