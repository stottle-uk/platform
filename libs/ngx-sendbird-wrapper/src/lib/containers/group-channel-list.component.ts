import { Component, OnInit } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-group-channel-list',
  template: `
    <stottle-channel-list-inner
      [channels]="groupChannels$ | async"
    ></stottle-channel-list-inner>
  `,
  styles: []
})
export class GroupChannelListComponent implements OnInit {
  groupChannels$ = this.vs.groupChannels$;

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit(): void {
    this.vs.getGroupChannels().subscribe();
  }
}
