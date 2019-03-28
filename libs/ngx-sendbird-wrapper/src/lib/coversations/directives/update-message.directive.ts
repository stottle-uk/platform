import { Directive, HostListener, Input } from '@angular/core';
import { ConversationsViewStateService } from '../services/conversations-view-state.service';

@Directive({
  selector: '[stottleUpdateMessage]'
})
export class UpdateMessageDirective {
  @Input()
  stottleUpdateMessage: SendBird.UserMessage | SendBird.FileMessage;

  constructor(private vs: ConversationsViewStateService) {}

  @HostListener('click')
  onClick(): void {
    this.vs.setSelectedMessageId(this.stottleUpdateMessage.messageId);
  }
}
