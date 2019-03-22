import { Component } from '@angular/core';
import { ConnectionViewStateService } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-chat-route',
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
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ChatRouteComponent {
  isConnected$ = this.sb.isConnected$;

  constructor(private sb: ConnectionViewStateService) {}
}
