import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SendbirdCreateChannelFormComponent } from '../../templates/send-bird-create-channel-form.component';
import { GenericOptions } from '../../_shared/models/shared.models';
import { ChannelsViewStateService } from '../services/channels-view-state.services';

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

  constructor(private vs: ChannelsViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateInstance(instance: SendbirdCreateChannelFormComponent): void {
    instance.channelSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(channel => this.vs.createOpenChannel(channel.name))
      )
      .subscribe();
  }
}
