import { Directive, HostListener, Input } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Directive({
  selector: '[stottleDeleteMessage]'
})
export class DeleteMessageDirective {
  @Input()
  message: SendBird.UserMessage | SendBird.FileMessage;

  constructor(private vs: SendbirdViewStateService) {}

  @HostListener('click')
  onClick(): void {
    this.vs.deleteMessage(this.message).subscribe();
  }
}
