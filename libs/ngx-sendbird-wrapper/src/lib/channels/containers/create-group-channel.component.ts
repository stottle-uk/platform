import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { GenericOptions } from '../../_shared/models/shared.models';
import { ChannelsViewStateService } from '../services/channels-view-state.services';
import { SendbirdCreateChannelFormComponent } from '../templates';

@Component({
  selector: 'stottle-create-group-channel',
  template: `
    <ng-container stottleGeneric [options]="options"></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGroupChannelComponent implements OnDestroy {
  @Input()
  callback: (channel: SendBird.GroupChannel) => void;

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
        ),
        tap(channel => !!this.callback && this.callback(channel))
      )
      .subscribe();
  }
}
