import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'stottle-messages-list-item',
  template: `
    <div fxLayout class="message-container">
      <div class="avatar-container">
        <img
          class="img-avatar"
          *ngIf="senderProfileUrl"
          [src]="senderProfileUrl"
          [alt]="senderName"
        />
      </div>
      <div fxFlex="grow">
        <div fxLayout class="header-container">
          <h3 fxFlex="grow">{{ senderName }}</h3>
          <small>
            <span> {{ createdAt | date }} </span>
            <span *ngIf="message" stottleDeleteMessage [message]="message">
              delete
            </span>
            <span *ngIf="message">
              update
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListItemComponent {
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

  get sender(): SendBird.Sender {
    return this.message && this.message.sender;
  }

  get senderName(): string {
    return this.sender && this.sender.userId;
  }

  get senderProfileUrl(): string {
    return this.sender && this.sender.profileUrl;
  }

  get createdAt(): number {
    return this.sender && this.message.createdAt;
  }

  constructor(private sanitizer: DomSanitizer) {}
}
