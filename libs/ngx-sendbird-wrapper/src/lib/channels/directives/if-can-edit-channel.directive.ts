import { NgIfContext } from '@angular/common';
import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { iif, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ConnectionViewStateService } from '../../connection/services/connection-view-state.service';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleIfCanEditChannel]'
})
export class IfCanEditChannelDirective implements OnInit {
  private destroy$ = new Subject();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgIfContext>,
    private vs: ChannelsViewStateService,
    private cvs: ConnectionViewStateService
  ) {}

  ngOnInit(): void {
    this.vs.currentChannel$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(channel =>
          iif(
            () => channel.isOpenChannel(),
            this.openChannel(channel as SendBird.OpenChannel),
            this.groupChannel(channel as SendBird.GroupChannel)
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private openChannel(channel: SendBird.OpenChannel): Observable<boolean> {
    return of(channel).pipe(
      withLatestFrom(this.cvs.currentUser$),
      map(([channel, user]) => channel.isOperator(user)),
      tap(isOperator => this.toggleView(isOperator))
    );
  }

  private groupChannel(channel: SendBird.GroupChannel): Observable<boolean> {
    return of(channel).pipe(
      map(channel => channel.myRole === 'operator'),
      tap(isOperator => this.toggleView(isOperator))
    );
  }

  private toggleView(isOperator: boolean): void {
    isOperator
      ? this.viewContainer.createEmbeddedView(this.templateRef)
      : this.viewContainer.clear();
  }
}
