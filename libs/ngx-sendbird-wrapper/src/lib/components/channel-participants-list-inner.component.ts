import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { ChannelParticipantsListItemComponent } from './channel-participants-list-item.component';

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
  styles: [
    `
      .channel-participants-container {
        width: 250px;
      }
    `
  ],
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

  private componentRefs: ComponentRef<ChannelParticipantsListItemComponent>[];
  private destroy$ = new Subject();

  constructor(
    private resolver: SendbirdComponentResolverService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.channelParticipantsList.changes
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.componentRefs = [])),
        tap(change => this.updateChannelParticipantsList(change)),
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

  private updateChannelParticipantsList(changes: any[]): void {
    changes.forEach((ref: ViewContainerRef, index: number) => {
      const cmpRef = this.resolver.createComponent(
        this.channelParticipantsListItemsRefs[index],
        ChannelParticipantsListItemComponent
      );
      cmpRef.instance.participant = this.participants[index];
      this.componentRefs.push(cmpRef);
    });
  }
}
