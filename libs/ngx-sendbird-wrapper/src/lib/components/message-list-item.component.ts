import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'stottle-message-list-item',
  template: `
    <mat-list-item>
      <img matListAvatar [src]="mappedMessage.senderImg" />
      <h3 matLine>{{ mappedMessage.sender }}</h3>
      <p matLine>
        <ng-container *ngIf="isUserMessage">{{ content }}</ng-container>
        <ng-container *ngIf="isFileMessage">
          <a [href]="file" target="_blank">Link</a>
        </ng-container>
        <span> {{ mappedMessage.date | date }} </span>
        <span stottle-delete-message [message]="message">
          delete
        </span>
      </p>
    </mat-list-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListItemComponent implements OnInit {
  @Input() message: SendBird.UserMessage | SendBird.FileMessage;

  get isUserMessage(): boolean {
    return this.message && this.message.isUserMessage();
  }

  get isFileMessage(): boolean {
    return this.message && this.message.isFileMessage();
  }

  get content(): string {
    return (<SendBird.UserMessage>this.message).message;
  }

  get file(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      (<SendBird.FileMessage>this.message).url
    );
  }

  get mappedMessage(): any {
    return {
      sender: this.message.sender.friendName,
      senderImg: this.message.sender.profileUrl,
      date: this.message.createdAt,
      id: this.message.messageId
    };
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
