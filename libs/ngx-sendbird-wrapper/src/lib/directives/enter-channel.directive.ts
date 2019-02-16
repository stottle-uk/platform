import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Directive({
  selector: '[stottleEnterChannel]'
})
export class EnterChannelDirective implements OnDestroy {
  @Input()
  channel: SendBird.BaseChannel;

  private destroy$ = new Subject();

  constructor(private vs: SendbirdViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('click')
  channelSelected(): void {
    if (this.channel.isOpenChannel()) {
      this.vs
        .enterOpenChannel(this.channel as SendBird.OpenChannel)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }

    if (this.channel.isGroupChannel()) {
      this.vs
        .enterGroupChannel(this.channel as SendBird.GroupChannel)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }
}
