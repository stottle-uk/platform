import { Component } from '@angular/core';
import { SendbirdViewStateService } from '../services/sendbird-view-state.service';

@Component({
  selector: 'stottle-receieved-invitations',
  template: `
    <stottle-receieved-invitations-inner [invitations]="invitations$ | async">
    </stottle-receieved-invitations-inner>
  `,
  styles: []
})
export class ReceievedInvitationsComponent {
  invitations$ = this.vs.receivedInvitations$;

  constructor(private vs: SendbirdViewStateService) {}
}
