import { Component, OnInit } from '@angular/core';
import { SendbirdViewStateService } from 'libs/ngx-sendbird-wrapper/src/lib/services/sendbird-view-state.service';

@Component({
  selector: 'stottle-chat',
  template: `
    <div class="content">
      <div fxLayout="row">
        <div style="width: 200px">
          <stottle-channel-list></stottle-channel-list>
        </div>
        <div fxFlex>
          <stottle-messages-list></stottle-messages-list>

          <stottle-send-message></stottle-send-message>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ChatComponent implements OnInit {
  constructor(private sb: SendbirdViewStateService) {}

  ngOnInit(): void {
    this.sb.connect('first_user').subscribe(console.log, console.error);
  }
}
