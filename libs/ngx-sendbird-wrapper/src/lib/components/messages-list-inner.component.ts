import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'stottle-messages-list-inner',
  template: `
    <mat-list>
      <ng-container *ngFor="let message of messages">
        <stottle-message-list-item
          [message]="message"
        ></stottle-message-list-item>
      </ng-container>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListInnerComponent {
  @Input() messages: Array<SendBird.UserMessage | SendBird.FileMessage>;
}
