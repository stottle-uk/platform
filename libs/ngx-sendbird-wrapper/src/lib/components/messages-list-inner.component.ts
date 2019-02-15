import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';
import { SendbirdFetchMoreMessagesBtnComponent } from '../templates/send-bird-fetch-more-messages-btn.component';
import { SendbirdMessagesListItemComponent } from '../templates/send-bird-messages-list-item.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush
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

  private componentRefs: ComponentRef<SendbirdMessagesListItemComponent>[];
  private fetchMoreMessagesBtnRef: ComponentRef<
    SendbirdFetchMoreMessagesBtnComponent
  >;
  private lastScrollHeight = 0;
  private destroy$ = new Subject();

  constructor(
    private scrollToService: ScrollToService,
    private resolver: SendbirdComponentResolverService<
      SendbirdMessagesListItemComponent
    >
  ) {}

  ngAfterViewInit(): void {
    this.fetchMoreMessagesBtnRef = this.resolver.createComponent(
      this.fetchMoreMessagesBtn,
      SendbirdFetchMoreMessagesBtnComponent
    );

    this.fetchMoreMessagesBtnRef.hostView.markForCheck();

    this.resolver
      .trackChanges(
        SendbirdMessagesListItemComponent,
        this.messagesList,
        this.messageListItems,
        this.updateInstance.bind(this)
      )
      .pipe(
        takeUntil(this.destroy$),
        tap(refs => (this.componentRefs = refs)),
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.fetchMoreMessagesBtnRef.destroy();
    this.componentRefs.forEach(ref => ref.destroy());
  }

  onScrollUp(): void {
    this.fetchMoreMessagesBtnRef.instance.fetchMoreMessages.getMore();
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

  private updateInstance(
    instance: SendbirdMessagesListItemComponent,
    index: number
  ): void {
    instance.message = this.messages[index];
  }
}
