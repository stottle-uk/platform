import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-messages-list-inner',
  template: `
    <mat-list>
      <mat-list-item *ngFor="let message of mapedMessages">
        <img matListAvatar [src]="message.senderImg" />
        <h3 matLine>{{ message.sender }}</h3>
        <p matLine>
          {{ message.content }}
          <span> {{ message.date | date }} </span>
        </p>
      </mat-list-item>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListInnerComponent {
  @Input() messages: SendBird.UserMessage[];

  get mapedMessages(): any[] {
    return this.messages.map(m => ({
      content: m.message,
      sender: m.sender.friendName,
      senderImg: m.sender.profileUrl,
      date: m.createdAt
    }));
  }
}
