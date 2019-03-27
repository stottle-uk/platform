import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionViewStateService } from '@stottle-platform/ngx-sendbird-wrapper';

@Component({
  selector: 'stottle-chat-route',
  template: `
    <div *ngIf="!userId">
      <input #userIdInput type="text" />
      <button (click)="enter('a_user')">a_user</button>
      <button (click)="enter('first_user')">first_user</button>
      <button (click)="enter(userIdInput.value)">Enter</button>
    </div>

    <ng-container *ngIf="!!userId">
      <div class="content" stottleConnection [userId]="userId">
        <div fxLayout="row" *ngIf="(isConnected$ | async)">
          <div>
            <stottle-create-open-channel
              [callback]="createChannelCallback"
            ></stottle-create-open-channel>
            <stottle-open-channel-list></stottle-open-channel-list>
          </div>

          <div fxFlex="grow">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </ng-container>
  `
})
export class ChatRouteComponent {
  isConnected$ = this.sb.isConnected$;
  userId: string = 'first_user';

  constructor(
    private sb: ConnectionViewStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  enter(userId: string): void {
    if (!!userId) {
      this.userId = userId;
    }
  }

  createChannelCallback = (channel: SendBird.BaseChannel) =>
    this.router.navigate(['./', channel.url], {
      relativeTo: this.activatedRoute
    });
}

// <hr />

// <stottle-create-group-channel
//   [callback]="createChannelCallback"
// ></stottle-create-group-channel>
// <stottle-group-channel-list></stottle-group-channel-list>
