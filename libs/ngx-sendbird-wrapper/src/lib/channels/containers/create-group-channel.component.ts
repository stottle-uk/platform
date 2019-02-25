import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GenericOptions } from '../../_shared/models/shared.models';
import { ChannelsViewStateService } from '../services/channels-view-state.services';
import { SendbirdCreateChannelFormComponent } from '../templates';

@Component({
  selector: 'stottle-create-group-channel',
  template: `
    <ng-container stottleGeneric [options]="options"></ng-container>
  `
})
export class CreateGroupChannelComponent implements OnDestroy {
  options: GenericOptions<SendbirdCreateChannelFormComponent> = {
    component: SendbirdCreateChannelFormComponent,
    updateInstance: this.updateInstance.bind(this)
  };

  private destroy$ = new Subject();

  constructor(private vs: ChannelsViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateInstance(instance: SendbirdCreateChannelFormComponent): void {
    instance.channelSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(channel =>
          this.vs.createGroupChannel(
            ['first_user', 'other_user'],
            false, // TODO - sort this!
            channel.name
          )
        )
      )
      .subscribe();
  }
}
