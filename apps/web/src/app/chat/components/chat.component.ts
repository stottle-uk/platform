import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'stottle-chat',
  template: `
    <div
      fxLayout="row"
      stottleGetAndEnterChannel
      [channelUrl]="channelUrl$ | async"
    >
      <div fxFlex="grow">
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <span>Channel Title</span>
          <a *stottleCanEditChannel routerLink="edit" mat-icon-button>
            <mat-icon aria-label="Edit Channel">
              edit
            </mat-icon>
          </a>
        </div>
        <stottle-messages-list></stottle-messages-list>
        <stottle-send-message></stottle-send-message>
        <stottle-send-file-message></stottle-send-file-message>
      </div>

      <div>
        <stottle-channel-participants-list></stottle-channel-participants-list>
        <stottle-receieved-invitations></stottle-receieved-invitations>
        <stottle-users-list></stottle-users-list>
      </div>
    </div>
  `
})
export class ChatComponent {
  channelUrl$ = this.activatedRoute.paramMap.pipe(
    filter(params => params.has('channelUrl')),
    map(params => params.get('channelUrl'))
  );

  constructor(private activatedRoute: ActivatedRoute) {}
}
