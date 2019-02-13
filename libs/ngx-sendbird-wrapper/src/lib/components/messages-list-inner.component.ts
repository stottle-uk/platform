import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {
  ScrollToConfigOptions,
  ScrollToService
} from '@nicky-lenaers/ngx-scroll-to';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FetchMoreMessagesComponent } from '../containers/fetch-more-messages.component';
import { MessageListItemComponent } from './message-list-item.component';

@Component({
  selector: 'stottle-messages-list-inner',
  template: `
    <div
      class="messages-container"
      #messagesContainer
      infiniteScroll
      [infiniteScrollUpDistance]="0.5"
      [infiniteScrollThrottle]="200"
      (scrolledUp)="onScrollUp()"
      [scrollWindow]="false"
    >
      <button type="button" mat-button>
        <span stottle-fetch-more-messages>Load More</span>
      </button>
      <ng-container
        #messagesList
        *ngFor="let message of messages; trackBy: trackByFn"
      >
        <template #messageListItem></template>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .messages-container {
        height: calc(100vh - 300px);
        overflow: auto;
      }
    `
  ]
})
export class MessagesListInnerComponent implements AfterViewInit, OnDestroy {
  @Input()
  messages: Array<SendBird.UserMessage | SendBird.FileMessage>;
  @Input()
  scrollToBottomEnabled: boolean;
  @Input()
  scrollPositionMaintainEnabled: boolean;

  @ViewChild(FetchMoreMessagesComponent)
  fetchMoreMessages: FetchMoreMessagesComponent;
  @ViewChild('messagesContainer')
  messagesContainer: ElementRef<HTMLDivElement>;
  @ViewChildren('messageListItem', { read: ViewContainerRef })
  messageListItems: QueryList<ViewContainerRef>;
  @ViewChildren('messagesList', { read: ViewContainerRef })
  messagesList: QueryList<ViewContainerRef>;

  get messageListItemsRefs(): ViewContainerRef[] {
    return this.messageListItems.toArray();
  }

  componentRefs: ComponentRef<MessageListItemComponent>[];
  lastScrollHeight = 0;
  destroy$ = new Subject();

  constructor(
    private scrollToService: ScrollToService,
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.messagesList.changes
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.componentRefs = [])),
        tap(change => {
          change.forEach((ref: ViewContainerRef, index: number) => {
            const target = this.messageListItemsRefs[index];

            target.clear();

            const widgetComponent = this.resolver.resolveComponentFactory(
              MessageListItemComponent
            );
            const cmpRef = target.createComponent(widgetComponent);

            cmpRef.instance.message = this.messages[index];

            this.componentRefs.push(cmpRef);
          });
        }),
        tap(() => this.cdr.detectChanges()),
        tap(
          () =>
            this.scrollToBottomEnabled && this.scrollToBottomOfMessagesList()
        ),
        tap(
          () =>
            this.scrollPositionMaintainEnabled &&
            this.setScrollPositionToTopOfListBeforeItemsWereAdded()
        ),
        tap(
          () =>
            (this.lastScrollHeight = this.messagesContainer.nativeElement.scrollHeight)
        )
      )
      .subscribe();
  }

  onScrollUp(): void {
    this.fetchMoreMessages.getMore();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRefs.forEach(ref => ref.destroy());
  }

  trackByFn(
    index: number,
    item: SendBird.UserMessage | SendBird.FileMessage
  ): number {
    return item ? item.messageId : index;
  }

  private scrollToBottomOfMessagesList(): void {
    const config: ScrollToConfigOptions = {
      container: this.messagesContainer,
      offset: this.messagesContainer.nativeElement.scrollHeight
    };
    this.scrollToService.scrollTo(config);
  }

  private setScrollPositionToTopOfListBeforeItemsWereAdded(): void {
    this.messagesContainer.nativeElement.scrollTop =
      this.messagesContainer.nativeElement.scrollHeight - this.lastScrollHeight;
  }
}
