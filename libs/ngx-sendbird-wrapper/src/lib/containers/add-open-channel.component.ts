import { Component, HostListener } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: '[stottle-add-open-channel]',
  template: `
    <ng-content></ng-content>
  `
})
export class AddOpenChannelComponent {
  constructor(private vs: SendbirdViewStateService) {}

  @HostListener('click')
  addChennel(): void {
    this.vs.createOpenChannel().subscribe();
  }
}
