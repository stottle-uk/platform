import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild
} from '@angular/core';
import { FetchMoreMessagesComponent } from '../containers/fetch-more-messages.component';

@Component({
  selector: 'stottle-messages-list-inner',
  template: `
    <div
      class="messages-container"
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
export class MessagesListInnerComponent {
  @Input() messages: Array<SendBird.UserMessage | SendBird.FileMessage>;

  @ViewChild(FetchMoreMessagesComponent)
  fetchMoreMessages: FetchMoreMessagesComponent;

  onScrollUp(): void {
    this.fetchMoreMessages.getMore();
  }
}
