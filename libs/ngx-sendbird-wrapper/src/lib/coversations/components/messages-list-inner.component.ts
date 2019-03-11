import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import {
  ScrollToConfigOptions,
  ScrollToService
} from '@nicky-lenaers/ngx-scroll-to';
import { BehaviorSubject, Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import {
  GenericListOptions,
  GenericListOptionsItem,
  GenericOptions
} from '../../_shared/models/shared.models';
import { UpdateMessageComponent } from '../containers/update-message.component';
import { SelectedMessageId } from '../services/conversations-view-state.service';
import {
  SendbirdFetchMoreMessagesBtnComponent,
  SendbirdMessagesListItemComponent
} from '../templates';

@Component({
  selector: 'stottle-messages-list-inner',
  template: `
    <div
      class="messages-container"
      #messagesContainer
      infiniteScroll
      [infiniteScrollUpDistance]="0.5"
      [infiniteScrollThrottle]="200"
      (scrolledUp)="scrolledUp.emit()"
      [scrollWindow]="false"
    >
      <ng-template stottleGeneric [options]="getMoreBtnOptions"></ng-template>
      <stottle-generic-list
        [options]="options"
        (changes)="onChanges($event)"
      ></stottle-generic-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListInnerComponent implements OnDestroy {
  @Input()
  messages: Array<SendBird.UserMessage | SendBird.FileMessage>;
  @Input()
  selectedMessageId: SelectedMessageId;
  @Input()
  scrollToBottomEnabled: boolean;
  @Input()
  scrollPositionMaintainEnabled: boolean;
  @Output()
  scrolledUp = new EventEmitter();
  @Output()
  changesNotified = new EventEmitter();

  @ViewChild('messagesContainer')
  messagesContainer: ElementRef<Element>;

  get items(): GenericListOptionsItem<
    SendBird.UserMessage | SendBird.FileMessage,
    SendbirdMessagesListItemComponent | UpdateMessageComponent
  >[] {
    return (
      this.messages &&
      this.messages.map(item => ({
        item,
        component: SendbirdMessagesListItemComponent
      }))
    );
  }

  get options(): GenericListOptions<
    SendBird.UserMessage | SendBird.FileMessage,
    SendbirdMessagesListItemComponent | UpdateMessageComponent
  > {
    return (
      !!this.selectedMessageId &&
      !!this.messages && {
        notifyOnChanges: this.selectedMessageId.notifyOnchanges,
        components: this.getComponents(),
        items: this.messages,
        trackByKey: this.trackByKey,
        updateInstance: this.updateInstance.bind(this)
      }
    );
  }

  get getMoreBtnOptions(): GenericOptions<
    SendbirdFetchMoreMessagesBtnComponent
  > {
    return {
      component: SendbirdFetchMoreMessagesBtnComponent
    };
  }

  private lastScrollHeight$ = new BehaviorSubject<number>(0);
  private destroy$ = new Subject();

  constructor(private scrollToService: ScrollToService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChanges(): void {
    this.lastScrollHeight$
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        tap(
          () =>
            this.scrollToBottomEnabled && this.scrollToBottomOfMessagesList()
        ),
        tap(
          ls =>
            this.scrollPositionMaintainEnabled &&
            this.setScrollPositionToTopOfListBeforeItemsWereAdded(ls)
        ),
        tap(() =>
          this.lastScrollHeight$.next(
            this.messagesContainer.nativeElement.scrollHeight
          )
        ),
        tap(() => this.changesNotified.emit())
      )
      .subscribe();
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

  private getComponents() {
    return this.messages.map(message =>
      message.messageId === this.selectedMessageId.messageId
        ? UpdateMessageComponent
        : SendbirdMessagesListItemComponent
    );
  }

  private scrollToBottomOfMessagesList(): void {
    const config: ScrollToConfigOptions = {
      container: this.messagesContainer,
      offset: this.messagesContainer.nativeElement.scrollHeight
    };
    this.scrollToService.scrollTo(config);
  }

  private setScrollPositionToTopOfListBeforeItemsWereAdded(
    lastScrollHeight: number
  ): void {
    this.messagesContainer.nativeElement.scrollTop =
      this.messagesContainer.nativeElement.scrollHeight - lastScrollHeight;
  }
}
