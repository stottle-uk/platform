import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { SendbirdViewStateService } from 'libs/ngx-sendbird-wrapper/src/lib/services/sendbird-view-state.service';

@Component({
  selector: 'stottle-chat',
  template: `
    <div class="content">
      <div *ngIf="!(isConnected$ | async)">
        <input type="text" #input />
        <button type="button" (click)="username()">Enter</button>
      </div>
      <div *ngIf="(isConnected$ | async)">
        <button type="button" (click)="disconnect()">Stop</button>
      </div>
      <div fxLayout="row" *ngIf="(isConnected$ | async)">
        <div style="width: 200px">
          <button type="button" mat-button>
            <span stottle-add-open-channel>Add</span>
          </button>

          <stottle-channel-list></stottle-channel-list>
        </div>
        <div fxFlex="grow">
          <stottle-messages-list></stottle-messages-list>
          <stottle-send-message></stottle-send-message>
          <stottle-send-file-message></stottle-send-file-message>
        </div>
        <div>
          <stottle-channel-participants-list></stottle-channel-participants-list>
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
    const userId = !!this.userId.nativeElement.value
      ? this.userId.nativeElement.value
      : 'first_user';

    this.sb.connect(userId).subscribe(console.log, console.error);
  }

  disconnect(): void {
    this.sb.disconnect().subscribe(console.log, console.error);
  }
}
