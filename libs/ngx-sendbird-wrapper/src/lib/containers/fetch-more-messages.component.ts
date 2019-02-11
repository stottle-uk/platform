import { Component, HostListener } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: '[stottle-fetch-more-messages]',
  template: `
    <ng-content></ng-content>
  `
})
export class FetchMoreMessagesComponent {
  constructor(private vs: SendbirdViewStateService) {}

  @HostListener('click')
  getMore(): void {
    this.vs.getMoreMessagesForCurrentChannel().subscribe();
  }
}
