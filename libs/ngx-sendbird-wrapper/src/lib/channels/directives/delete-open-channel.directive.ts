import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ConnectionViewStateService } from '../../connection/services/connection-view-state.service';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleDeleteOpenChannel]'
})
export class DeleteOpenChannelDirective implements OnInit, OnDestroy {
  @Input()
  callback: () => void;

  private destroy$ = new Subject();

  constructor(
    private vs: ChannelsViewStateService,
    private connection: ConnectionViewStateService,
    private elementRef: ElementRef,
    private rdr: Renderer2
  ) {}

  ngOnInit(): void {
    this.connection.currentUser$
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(this.vs.currentChannel$),
        filter(([user, channel]) => channel.isOpenChannel()),
        map(([user, channel]) =>
          (<SendBird.OpenChannel>channel).isOperator(user)
        ),
        tap(isChannelOperator => !isChannelOperator && this.hideElement())
      )
      .subscribe();
  }

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

  private hideElement() {
    this.rdr.setAttribute(this.elementRef.nativeElement, 'hidden', 'true');
  }
}
