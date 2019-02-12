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
    <div fxLayout class="message-container" *ngIf="message">
      <div class="avatar-container">
        <img class="img-avatar" [src]="mappedMessage.senderImg" />
      </div>
      <div fxFlex="grow">
        <div fxLayout class="header-container">
          <h3 fxFlex="grow">{{ mappedMessage.sender }}</h3>
          <small>
            <span> {{ mappedMessage.date | date }} </span>
            <span stottle-delete-message [message]="message">
              delete
            </span>
          </small>
        </div>
        <div>
          <ng-container *ngIf="userMessage">{{ content }}</ng-container>
          <ng-container *ngIf="fileMessage">
            <img [src]="file" />
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .message-container {
        padding: 10px 0px;
        border-bottom: 1px solid #ccc;
      }

      .avatar-container {
        margin: 0 10px;
      }

      .img-avatar {
        height: 32px;
        width: 32px;
      }

      h3 {
        margin: 0;
      }

      img {
        height: auto;
        max-width: 100%;
        display: block;
        vertical-align: middle;
        border-style: none;
      }

      .header-container {
        margin: 0 0 10px 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListItemComponent implements OnInit {
  @Input() message: SendBird.UserMessage | SendBird.FileMessage;

  get userMessage(): SendBird.UserMessage {
    return (
      this.message &&
      this.message.isUserMessage() &&
      (this.message as SendBird.UserMessage)
    );
  }

  get fileMessage(): SendBird.FileMessage {
    return (
      this.message &&
      this.message.isFileMessage() &&
      (this.message as SendBird.FileMessage)
    );
  }

  get content(): string {
    return this.userMessage.message;
  }

  get file(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.fileMessage.url);
  }

  get mappedMessage(): any {
    return (
      this.message && {
        sender: this.message.sender.userId,
        senderImg: this.message.sender.profileUrl,
        date: this.message.createdAt,
        id: this.message.messageId
      }
    );
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
