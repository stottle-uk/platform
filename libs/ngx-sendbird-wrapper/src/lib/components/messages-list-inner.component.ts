import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  ScrollToConfigOptions,
  ScrollToService
} from '@nicky-lenaers/ngx-scroll-to';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FetchMoreMessagesComponent } from '../containers/fetch-more-messages.component';

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
      <stottle-message-list-item
        #messages
        *ngFor="let message of messages"
        [message]="message"
      ></stottle-message-list-item>
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
  @ViewChildren('messages')
  messagesList: QueryList<HTMLTableRowElement>;

  lastScrollHeight = 0;
  destroy$ = new Subject();

  constructor(private scrollToService: ScrollToService) {}

  ngAfterViewInit(): void {
    this.messagesList.changes
      .pipe(
        takeUntil(this.destroy$),
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
