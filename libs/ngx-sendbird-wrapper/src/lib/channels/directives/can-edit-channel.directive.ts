import { NgIfContext } from '@angular/common';
import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { iif, Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConnectionViewStateService } from '../../connection/services/connection-view-state.service';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

@Directive({
  selector: '[stottleCanEditChannel]'
})
export class CanEditChannelDirective implements OnInit {
  private destroy$ = new Subject();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgIfContext>,
    private connection: ConnectionViewStateService,
    private vs: ChannelsViewStateService
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
    return this.connection.checkUser(channel, (user, channel) =>
      channel.isOperator(user)
    );
  }

  private groupChannel(channel: SendBird.GroupChannel): Observable<boolean> {
    return this.connection.checkUser(
      channel,
      (user, channel) => channel.myRole === 'operator'
    );
  }

  private toggleView(isOperator: boolean): void {
    this.viewContainer.clear();
    if (isOperator) {
      isOperator && this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
