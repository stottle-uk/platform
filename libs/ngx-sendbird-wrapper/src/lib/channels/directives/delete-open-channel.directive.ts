import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleDeleteOpenChannel]'
})
export class DeleteOpenChannelDirective implements OnDestroy {
  @Input()
  callback: () => void;

  private destroy$ = new Subject();

  constructor(private vs: ChannelsViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('click')
  onClick(): void {
    this.vs
      .deleteOpenChannel()
      .pipe(
        takeUntil(this.destroy$),
        tap(() => !!this.callback && this.callback())
      )
      .subscribe();
  }
}
