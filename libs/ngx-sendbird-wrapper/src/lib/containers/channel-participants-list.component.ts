import { Component, OnInit } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-channel-participants-list',
  template: `
    <stottle-channel-participants-list-inner
      [participants]="participants$ | async"
    ></stottle-channel-participants-list-inner>
  `
})
export class ChannelParticipantsListComponent implements OnInit {
  participants$ = this.vs.participantsForCurrentChannel$;

  constructor(private vs: SendbirdViewStateService) {}

  ngOnInit() {
    this.vs.getChannelParticipants().subscribe();
  }
}
