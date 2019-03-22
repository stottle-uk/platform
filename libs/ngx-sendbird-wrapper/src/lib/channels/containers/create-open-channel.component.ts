import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ConnectionViewStateService } from '../../connection/services/connection-view-state.service';
import { GenericOptions } from '../../_shared/models/shared.models';
import { ChannelsViewStateService } from '../services/channels-view-state.services';
import { SendbirdCreateChannelFormComponent } from '../templates';

@Component({
  selector: 'stottle-create-open-channel',
  template: `
    <ng-container stottleGeneric [options]="options"></ng-container>
  `
})
export class CreateOpenChannelComponent implements OnDestroy {
  options: GenericOptions<SendbirdCreateChannelFormComponent> = {
    component: SendbirdCreateChannelFormComponent,
    updateInstance: this.updateInstance.bind(this)
  };

  private destroy$ = new Subject();

  constructor(
    private vs: ChannelsViewStateService,
    private cvs: ConnectionViewStateService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateInstance(instance: SendbirdCreateChannelFormComponent): void {
    instance.channelSubmit
      .pipe(
        takeUntil(this.destroy$),
        withLatestFrom(this.cvs.currentUser$),
        switchMap(([channel, currentUser]) =>
          this.vs.createOpenChannel(
            channel.name,
            null,
            null,
            currentUser.userId,
            null
          )
        )
      )
      .subscribe();
  }
}
