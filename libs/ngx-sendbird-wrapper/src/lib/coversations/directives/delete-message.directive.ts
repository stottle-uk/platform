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
import { ConversationsViewStateService } from '../services/conversations-view-state.service';

@Directive({
  selector: '[stottleDeleteMessage]'
})
export class DeleteMessageDirective implements OnInit, OnDestroy {
  @Input()
  message: SendBird.UserMessage | SendBird.FileMessage;

  private destroy$ = new Subject();

  constructor(
    private vs: ConversationsViewStateService,
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
        map(
          ([user, channel]) =>
            (<SendBird.OpenChannel>channel).isOperator(user) ||
            user.userId === this.message.sender.userId
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
      .deleteMessage(this.message)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private hideElement() {
    this.rdr.setAttribute(this.elementRef.nativeElement, 'hidden', 'true');
  }
}
