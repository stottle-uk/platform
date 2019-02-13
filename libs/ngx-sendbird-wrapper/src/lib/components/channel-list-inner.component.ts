import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { ChannelListItemComponent } from './channel-list-item.component';

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
  styles: [
    `
      .channels-container {
        width: 250px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelListInnerComponent implements AfterViewInit, OnDestroy {
  @Input()
  channels: SendBird.OpenChannel[];

  @ViewChildren('channelsListItem', { read: ViewContainerRef })
  channelsListItems: QueryList<ViewContainerRef>;
  @ViewChildren('channelsList', { read: ViewContainerRef })
  channelsList: QueryList<ViewContainerRef>;

  private get channelsListItemsRefs(): ViewContainerRef[] {
    return this.channelsListItems.toArray();
  }

  private componentRefs: ComponentRef<ChannelListItemComponent>[];
  private destroy$ = new Subject();

  constructor(
    private resolver: SendbirdComponentResolverService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.channelsList.changes
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.componentRefs = [])),
        tap(change => this.updateChannelsList(change)),
        tap(() => this.cdr.detectChanges())
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

  private updateChannelsList(changes: any[]): void {
    changes.forEach((ref: ViewContainerRef, index: number) => {
      const cmpRef = this.resolver.createChannelListItemComponent(
        this.channelsListItemsRefs[index]
      );
      cmpRef.instance.channel = this.channels[index];
      this.componentRefs.push(cmpRef);
    });
  }
}
