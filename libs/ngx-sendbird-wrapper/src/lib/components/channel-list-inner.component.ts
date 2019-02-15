import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as SendBird from 'sendbird';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdChannelListItemComponent } from '../templates/send-bird-channel-list-item.component';

@Component({
  selector: 'stottle-channel-list-inner',
  template: `
    <div class="channels-container">
      <ng-container
        #channelsList
        *ngFor="let channel of channels; trackBy: trackByFn"
      >
        <template #channelsListItem></template>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelListInnerComponent implements AfterViewInit, OnDestroy {
  @Input()
  channels: SendBird.OpenChannel[];

  @ViewChildren('channelsListItem', { read: ViewContainerRef })
  channelsListItems: QueryList<ViewContainerRef>;
  @ViewChildren('channelsList', { read: ViewContainerRef })
  channelsList: QueryList<ViewContainerRef>;

  private componentRefs: ComponentRef<SendbirdChannelListItemComponent>[];
  private destroy$ = new Subject();

  constructor(
    private resolver: SendbirdComponentResolverService<
      SendbirdChannelListItemComponent
    >
  ) {}

  ngAfterViewInit(): void {
    this.resolver
      .trackChanges(
        SendbirdChannelListItemComponent,
        this.channelsList,
        this.channelsListItems,
        this.updateInstance.bind(this)
      )
      .pipe(
        takeUntil(this.destroy$),
        tap(refs => (this.componentRefs = refs))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRefs.forEach(ref => ref.destroy());
  }

  trackByFn(index: number, item: SendBird.OpenChannel): string {
    return item ? item.url : index.toString();
  }

  private updateInstance(
    instance: SendbirdChannelListItemComponent,
    index: number
  ): void {
    instance.channel = this.channels[index];
  }
}
