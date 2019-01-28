import { Component, OnInit } from '@angular/core';
import { SendBirdService } from 'libs/ngx-sendbird-wrapper/src/lib/services/sendbird.service';

@Component({
  selector: 'stottle-chat',
  template: `
    <p>
      chat works!
    </p>

    <stottle-channel-list></stottle-channel-list>
  `,
  styles: []
})
export class ChatComponent implements OnInit {
  constructor(private sb: SendBirdService) {}

  ngOnInit(): void {
    this.sb
      .connect('first_user')
      // .pipe(switchMap(user => this.sb.getOpenChannels()))
      // tap(console.log),
      // map(channels => channels[0]),
      // this.getAndEnterChannel(),
      // switchMap(channel => this.getPreviousMessages(channel))
      // switchMap(channel => this.sendMessage('another message', channel))
      .subscribe(console.log, console.error);
  }
}
