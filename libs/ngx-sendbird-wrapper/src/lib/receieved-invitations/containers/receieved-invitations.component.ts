import { Component } from '@angular/core';
import { ReceievedInvitationsViewStateService } from '../services/receieved-invitations-view-state.service';

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

  constructor(private vs: ReceievedInvitationsViewStateService) {}
}
