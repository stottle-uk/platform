import { NgIfContext } from '@angular/common';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { iif, Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConnectionViewStateService } from '../../connection/services/connection-view-state.service';
import { ConversationsViewStateService } from '../services/conversations-view-state.service';

@Directive({
  selector: '[stottleCanEditMessage]'
})
export class CanEditMessageDirective {
  @Input()
  stottleCanEditMessage: SendBird.UserMessage | SendBird.FileMessage;

  private destroy$ = new Subject();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgIfContext>,
    private vs: ConversationsViewStateService,
    private connection: ConnectionViewStateService
  ) {}

  ngOnInit(): void {
    this.vs.currentChannel$
      .pipe(
        switchMap(channel =>
          iif(
            () => channel.isOpenChannel(),
            this.openChannel(channel as SendBird.OpenChannel),
            this.groupChannel(channel as SendBird.GroupChannel)
          )
        ),
        tap(isOperator => this.toggleView(isOperator))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private openChannel(channel: SendBird.OpenChannel): Observable<boolean> {
    return this.connection.checkUser(
      channel,
      (user, channel) =>
        channel.isOperator(user) ||
        this.stottleCanEditMessage.sender.userId === user.userId
    );
  }

  private groupChannel(channel: SendBird.GroupChannel): Observable<boolean> {
    return this.connection.checkUser(
      channel,
      (user, channel) =>
        channel.myRole === 'operator' ||
        this.stottleCanEditMessage.sender.userId === user.userId
    );
  }

  private toggleView(isOperator: boolean): void {
    this.viewContainer.clear();
    if (isOperator) {
      isOperator && this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
