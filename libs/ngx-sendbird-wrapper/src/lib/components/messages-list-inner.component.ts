import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-messages-list-inner',
  template: `
    <div class="messages-container">
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
}
