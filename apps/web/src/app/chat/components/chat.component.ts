import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SendbirdViewStateService } from 'libs/ngx-sendbird-wrapper/src/lib/services/sendbird-view-state.service';

@Component({
  selector: 'stottle-chat',
  template: `
    <div class="content">
      <div>
        <input type="text" #input />
        <button type="button" (click)="username()">Enter</button>
      </div>
      <div fxLayout="row">
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
export class ChatComponent implements OnInit {
  @ViewChild('input') userId: ElementRef<HTMLInputElement>;

  constructor(private sb: SendbirdViewStateService) {}

  ngOnInit(): void {
    // this.sb.connect('first_user').subscribe(console.log, console.error);
  }

  username(): void {
    console.log(this.userId.nativeElement.value);

    this.sb
      .connect(this.userId.nativeElement.value)
      .subscribe(console.log, console.error);
  }
}
