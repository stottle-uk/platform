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
import { FetchMoreMessagesBtnComponent } from './fetch-more-messages-btn.component';
import { MessagesListItemComponent } from './messages-list-item.component';

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
      <template #fetchMoreMessagesBtn></template>
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

  @ViewChild('messagesContainer')
  messagesContainer: ElementRef<Element>;
  @ViewChild('fetchMoreMessagesBtn', { read: ViewContainerRef })
  fetchMoreMessagesBtn: ViewContainerRef;
  @ViewChildren('messageListItem', { read: ViewContainerRef })
  messageListItems: QueryList<ViewContainerRef>;
  @ViewChildren('messagesList', { read: ViewContainerRef })
  messagesList: QueryList<ViewContainerRef>;

  private get messageListItemsRefs(): ViewContainerRef[] {
    return this.messageListItems.toArray();
  }

  private componentRefs: ComponentRef<MessagesListItemComponent>[];
  private fetchMoreMessagesBtnRef: ComponentRef<FetchMoreMessagesBtnComponent>;
  private lastScrollHeight = 0;
  private destroy$ = new Subject();

  constructor(
    private scrollToService: ScrollToService,
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.fetchMoreMessagesBtn.clear();

    const messageFormCmp = this.resolver.resolveComponentFactory(
      FetchMoreMessagesBtnComponent
    );
    this.fetchMoreMessagesBtnRef = this.fetchMoreMessagesBtn.createComponent(
      messageFormCmp
    );

    this.cdr.detectChanges();

    this.messagesList.changes
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.componentRefs = [])),
        tap(change => {
          change.forEach((ref: ViewContainerRef, index: number) => {
            const target = this.messageListItemsRefs[index];

            target.clear();

            const messageListItemCmp = this.resolver.resolveComponentFactory(
              MessagesListItemComponent
            );
            const cmpRef = target.createComponent(messageListItemCmp);

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
    this.fetchMoreMessagesBtnRef.instance.fetchMoreMessages.getMore();
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
