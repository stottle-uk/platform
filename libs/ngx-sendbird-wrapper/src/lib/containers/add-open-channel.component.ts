import { Component, HostListener, OnInit } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: '[stottle-add-open-channel]',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class AddOpenChannelComponent implements OnInit {
  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {}

  @HostListener('click')
  addChennel(): void {
    this.vs.createOpenChannel().subscribe();
  }
}
