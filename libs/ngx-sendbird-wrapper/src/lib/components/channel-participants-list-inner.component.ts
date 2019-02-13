import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
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
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.channelParticipantsList.changes
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.componentRefs = [])),
        tap(change => {
          change.forEach((ref: ViewContainerRef, index: number) => {
            const target = this.channelParticipantsListItemsRefs[index];

            target.clear();

            const channelparticipantsListItemCmp = this.resolver.resolveComponentFactory(
              ChannelParticipantsListItemComponent
            );
            const cmpRef = target.createComponent(
              channelparticipantsListItemCmp
            );

            cmpRef.instance.participant = this.participants[index];

            this.componentRefs.push(cmpRef);
          });
        }),
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
}
