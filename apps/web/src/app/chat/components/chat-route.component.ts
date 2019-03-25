import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionViewStateService } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-chat-route',
  template: `
    <div class="content" stottleConnection userId="first_user">
      <div fxLayout="row" *ngIf="(isConnected$ | async)">
        <div>
          <stottle-create-open-channel
            [callback]="createChannelCallback"
          ></stottle-create-open-channel>
          <stottle-open-channel-list></stottle-open-channel-list>

          <hr />

          <stottle-create-group-channel
            [callback]="createChannelCallback"
          ></stottle-create-group-channel>
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

  constructor(
    private sb: ConnectionViewStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  createChannelCallback = (channel: SendBird.BaseChannel) =>
    this.router.navigate(['./', channel.url], {
      relativeTo: this.activatedRoute
    });
}
