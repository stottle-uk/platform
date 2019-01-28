import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@stottle-platform/ngx-auth0-wrapper-ngrx';
import { SignalrService } from '@stottle-platform/ngx-signalr-wrapper';

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
    private signalrService: SignalrService
  ) {}

  ngOnInit(): void {}

  closeConnection(): void {
    this.signalrService.stop(true).subscribe();
  }
}
