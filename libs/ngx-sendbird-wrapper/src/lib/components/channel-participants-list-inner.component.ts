import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdChannelParticipantsListItemComponent } from '../templates/send-bird-channel-participants-list-item.component';

@Component({
  selector: 'stottle-channel-participants-list-inner',
  template: `
    <div class="channel-participants-container">
      <ng-container
        #channelParticipantsList
        *ngFor="let participant of participants; trackBy: trackByFn"
      >
        <template #channelParticipantsListItem></template>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelParticipantsListInnerComponent {
  @Input()
  participants: SendBird.User[];

  @ViewChildren('channelParticipantsListItem', { read: ViewContainerRef })
  channelParticipantsListItems: QueryList<ViewContainerRef>;
  @ViewChildren('channelParticipantsList', { read: ViewContainerRef })
  channelParticipantsList: QueryList<ViewContainerRef>;

  private get channelParticipantsListItemsRefs(): ViewContainerRef[] {
    return this.channelParticipantsListItems.toArray();
  }

  private componentRefs: ComponentRef<
    SendbirdChannelParticipantsListItemComponent
  >[];
  private destroy$ = new Subject();

  constructor(
    private resolver: SendbirdComponentResolverService<
      SendbirdChannelParticipantsListItemComponent
    >
  ) {}

  ngAfterViewInit(): void {
    this.resolver
      .trackChanges(
        SendbirdChannelParticipantsListItemComponent,
        this.channelParticipantsList,
        this.channelParticipantsListItems,
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
    instance: SendbirdChannelParticipantsListItemComponent,
    index: number
  ): void {
    instance.participant = this.participants[index];
  }
}
