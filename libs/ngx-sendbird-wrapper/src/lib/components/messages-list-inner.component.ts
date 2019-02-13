import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

  private componentRefs: ComponentRef<SendbirdMessagesListItemComponent>[];
  private fetchMoreMessagesBtnRef: ComponentRef<
    SendbirdFetchMoreMessagesBtnComponent
  >;
  private lastScrollHeight = 0;
  private destroy$ = new Subject();

  constructor(
    private scrollToService: ScrollToService,
    private resolver: SendbirdComponentResolverService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.fetchMoreMessagesBtnRef = this.resolver.createComponent(
      this.fetchMoreMessagesBtn,
      SendbirdFetchMoreMessagesBtnComponent
    );

    this.cdr.detectChanges();

    this.messagesList.changes
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.componentRefs = [])),
        tap(change => this.updateMessagesList(change)),
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

  private updateMessagesList(changes: any[]): void {
    changes.forEach((ref: ViewContainerRef, index: number) => {
      const cmpRef = this.resolver.createComponent(
        this.messageListItemsRefs[index],
        SendbirdMessagesListItemComponent
      );
      cmpRef.instance.message = this.messages[index];
      this.componentRefs.push(cmpRef);
    });
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
