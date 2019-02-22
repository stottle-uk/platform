import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { SendbirdViewStateService } from '@stottle-platform/ngx-sendbird-wrapper';
import { merge } from 'rxjs';

@Component({
  selector: 'stottle-chat',
  template: `
    <div class="content">
      <div *ngIf="!(isConnected$ | async)">
        <input type="text" #input />
        <button type="button" (click)="username()">Enter</button>

        <button type="button" (click)="first_user()">first_user</button>
        <button type="button" (click)="other_user()">other_user</button>
      </div>
      <div *ngIf="(isConnected$ | async)">
        <button type="button" (click)="disconnect()">Stop</button>
      </div>
      <div fxLayout="row" *ngIf="(isConnected$ | async)">
        <div>
          <stottle-create-open-channel></stottle-create-open-channel>
          <stottle-open-channel-list></stottle-open-channel-list>

          <hr />

          <stottle-create-group-channel></stottle-create-group-channel>
          <stottle-group-channel-list></stottle-group-channel-list>
        </div>

        <div fxFlex="grow">
          <stottle-messages-list></stottle-messages-list>
          <stottle-send-message></stottle-send-message>
          <stottle-send-file-message></stottle-send-file-message>
        </div>

        <div>
          <stottle-channel-participants-list></stottle-channel-participants-list>
          <stottle-receieved-invitations></stottle-receieved-invitations>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('input') userId: ElementRef<HTMLInputElement>;

  isConnected$ = this.sb.isConnected$;

  constructor(private sb: SendbirdViewStateService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.disconnect();
  }

  username(): void {
    if (!!this.userId.nativeElement.value) {
      this.connect(this.userId.nativeElement.value);
    }
  }

  first_user(): void {
    this.connect('first_user');
  }

  other_user(): void {
    this.connect('other_user');
  }

  disconnect(): void {
    this.sb.disconnect().subscribe(console.log, console.error);
  }

  private connect(userId: string) {
    const connect$ = this.sb.connect(userId);

    merge(connect$).subscribe(console.log, console.error);
  }
}
