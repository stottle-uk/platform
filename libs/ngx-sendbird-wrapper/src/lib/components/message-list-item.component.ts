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
    <div fxLayout class="message-container">
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
          <ng-container *ngIf="isUserMessage">{{ content }}</ng-container>
          <ng-container *ngIf="isFileMessage">
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
    console.log(this.message);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      (<SendBird.FileMessage>this.message).url
    );
  }

  get mappedMessage(): any {
    return {
      sender: this.message.sender.userId,
      senderImg: this.message.sender.profileUrl,
      date: this.message.createdAt,
      id: this.message.messageId
    };
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
