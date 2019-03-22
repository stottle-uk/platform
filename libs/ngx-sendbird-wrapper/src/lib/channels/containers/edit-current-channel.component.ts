import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GenericOptions } from '../../_shared/models/shared.models';
import { ChannelsViewStateService } from '../services/channels-view-state.services';
import { SendBirdChannelFormComponent } from '../templates/send-bird-channel-form.component';

@Component({
  selector: 'stottle-edit-current-channel',
  template: `
    <ng-container stottleGeneric [options]="options"></ng-container>
  `
})
export class EditCurrentChannelComponent implements OnDestroy {
  options: GenericOptions<SendBirdChannelFormComponent> = {
    component: SendBirdChannelFormComponent,
    updateInstance: this.updateInstance.bind(this)
  };

  private destroy$ = new Subject();

  constructor(private vs: ChannelsViewStateService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateInstance(instance: SendBirdChannelFormComponent): void {
    this.handleSubmit(instance);
    this.setChannel(instance);
  }

  private handleSubmit(instance: SendBirdChannelFormComponent) {
    instance.messageSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap(channel =>
          this.vs.updateOpenChannel(
            channel.name,
            channel.coverUrl,
            null,
            null,
            null
          )
        )
      )
      .subscribe();
  }

  private setChannel(instance: SendBirdChannelFormComponent) {
    this.vs.currentChannel$
      .pipe(
        // take(1),
        // delay(0),
        map(channel => channel as SendBird.OpenChannel),
        tap(channel => (instance.channel = channel))
      )
      .subscribe();
  }
}
