import { Component } from '@angular/core';
import { ConnectionViewStateService } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-chat',
  template: `
    <div class="content" stottleConnection userId="first_user">
      <div fxLayout="row" *ngIf="(isConnected$ | async)">
        <div>
          <stottle-create-open-channel></stottle-create-open-channel>
          <stottle-open-channel-list></stottle-open-channel-list>

          <hr />

          <stottle-create-group-channel></stottle-create-group-channel>
          <stottle-group-channel-list></stottle-group-channel-list>
        </div>

        <div fxFlex="grow">
          <button stottleEditCurrentChannelLink location="./edit">Go</button>
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
    </div>
  `
})
export class ChatComponent {
  isConnected$ = this.sb.isConnected$;

  constructor(private sb: ConnectionViewStateService) {}
}
