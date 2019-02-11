import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-messages-list-inner',
  template: `
    <mat-list>
      <mat-list-item *ngFor="let message of mappedMessages">
        <img matListAvatar [src]="message.senderImg" />
        <h3 matLine>{{ message.sender }}</h3>
        <p matLine>
          {{ message.content }}
          <span> {{ message.date | date }} </span>
          <span stottle-delete-message [message]="getMessage(message)">
            delete
          </span>
        </p>
      </mat-list-item>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListInnerComponent {
  @Input() messages: Array<SendBird.UserMessage | SendBird.FileMessage>;

  get mappedMessages(): any[] {
    return this.messages.map((m: SendBird.UserMessage) => ({
      content: m.message,
      sender: m.sender.friendName,
      senderImg: m.sender.profileUrl,
      date: m.createdAt,
      id: m.messageId,
      type: m.isUserMessage()
    }));
  }

  getMessage(message: any): SendBird.UserMessage | SendBird.FileMessage {
    return this.messages.find(m => m.messageId === message.id);
  }
}
