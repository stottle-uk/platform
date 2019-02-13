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
        #channelparticipantsList
        *ngFor="let participant of participants; trackBy: trackByFn"
      >
        <template #channelparticipantsListItem></template>
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

  @ViewChildren('channelparticipantsListItem', { read: ViewContainerRef })
  channelparticipantsListItems: QueryList<ViewContainerRef>;
  @ViewChildren('channelparticipantsList', { read: ViewContainerRef })
  channelparticipantsList: QueryList<ViewContainerRef>;

  private get channelparticipantsListItemsRefs(): ViewContainerRef[] {
    return this.channelparticipantsListItems.toArray();
  }

  private componentRefs: ComponentRef<ChannelParticipantsListItemComponent>[];
  private destroy$ = new Subject();

  constructor(
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.channelparticipantsList.changes
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.componentRefs = [])),
        tap(change => {
          change.forEach((ref: ViewContainerRef, index: number) => {
            const target = this.channelparticipantsListItemsRefs[index];

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
