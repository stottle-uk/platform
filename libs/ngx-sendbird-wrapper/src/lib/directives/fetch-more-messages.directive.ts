import { Directive, HostListener } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Directive({
  selector: '[stottleFetchMoreMessages]'
})
export class FetchMoreMessagesDirective {
  constructor(private vs: SendbirdViewStateService) {}

  @HostListener('click')
  getMore(): void {
    this.vs.getMoreMessagesForCurrentChannel().subscribe();
  }
}
