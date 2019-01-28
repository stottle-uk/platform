import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@stottle-platform/ngx-auth0-wrapper-ngrx';
import { SignalrService } from '@stottle-platform/ngx-signalr-wrapper';
import { SendBirdService } from 'libs/ngx-sendbird-wrapper/src/lib/services/sendbird.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'stottle-platform-root',
  template: `
    <stottle-container></stottle-container>
  `
})
export class AppComponent implements OnInit {
  title = 'stottle.uk';

  constructor(
    private store: Store<AuthState>,
    private signalrService: SignalrService,
    private sb: SendBirdService
  ) {}

  ngOnInit(): void {
    this.sb
      .connect('first_user')
      .pipe(switchMap(user => this.sb.getOpenChannels()))
      // tap(console.log),
      // map(channels => channels[0]),
      // this.getAndEnterChannel(),
      // switchMap(channel => this.getPreviousMessages(channel))
      // switchMap(channel => this.sendMessage('another message', channel))
      .subscribe(console.log, console.error);
  }

  closeConnection(): void {
    this.signalrService.stop(true).subscribe();
  }
}
