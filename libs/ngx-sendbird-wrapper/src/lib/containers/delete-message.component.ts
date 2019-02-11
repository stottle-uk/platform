import { Component, HostListener, Input } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: '[stottle-delete-message]',
  template: `
    <ng-content></ng-content>
  `
})
export class DeleteMessageComponent {
  @Input()
  message: SendBird.UserMessage | SendBird.FileMessage;

  constructor(private vs: SendbirdViewStateService) {}

  @HostListener('click')
  onClick(): void {
    this.vs.deleteMessage(this.message).subscribe();
  }
}
