import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ScrollToConfigOptions,
  ScrollToService
} from '@nicky-lenaers/ngx-scroll-to';
import { GenericListOptions } from '../models/messages.model';
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
      <stottle-generic-list
        [options]="options"
        (changes)="onChanges($event)"
      ></stottle-generic-list>
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

  get options(): GenericListOptions<
    SendBird.UserMessage | SendBird.FileMessage,
    SendbirdMessagesListItemComponent
  > {
    return {
      component: SendbirdMessagesListItemComponent,
      items: this.messages,
      trackByKey: this.trackByKey,
      updateInstance: this.updateInstance.bind(this)
    };
  }

  @ViewChild('messagesContainer')
  messagesContainer: ElementRef<Element>;
  @ViewChild('fetchMoreMessagesBtn', { read: ViewContainerRef })
  fetchMoreMessagesBtn: ViewContainerRef;

  private fetchMoreMessagesBtnRef: ComponentRef<
    SendbirdFetchMoreMessagesBtnComponent
  >;
  private lastScrollHeight = 0;

  constructor(
    private scrollToService: ScrollToService,
    private resolver: SendbirdComponentResolverService
  ) {}

  ngAfterViewInit(): void {
    this.fetchMoreMessagesBtnRef = this.resolver.createComponent(
      this.fetchMoreMessagesBtn,
      SendbirdFetchMoreMessagesBtnComponent
    );

    this.fetchMoreMessagesBtnRef.hostView.detectChanges();
  }

  ngOnDestroy(): void {
    this.fetchMoreMessagesBtnRef.destroy();
  }

  onScrollUp(): void {
    this.fetchMoreMessagesBtnRef.instance.fetchMoreMessages.getMore();
  }

  onChanges(): void {
    this.scrollToBottomEnabled && this.scrollToBottomOfMessagesList();
    this.scrollPositionMaintainEnabled &&
      this.setScrollPositionToTopOfListBeforeItemsWereAdded();
    this.lastScrollHeight = this.messagesContainer.nativeElement.scrollHeight;
  }

  private trackByKey(
    item: SendBird.UserMessage | SendBird.FileMessage
  ): number {
    return item.messageId;
  }

  private updateInstance(
    instance: SendbirdMessagesListItemComponent,
    index: number
  ): void {
    instance.message = this.messages[index];
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
