import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthState,
  fromAuthenticationActions
} from '@stottle-platform/ngx-auth0-wrapper-ngrx';
import { SignalrService } from '@stottle-platform/ngx-signalr-wrapper';

//

@Component({
  selector: 'stottle-platform-root',
  template: `
  
  <stottle-container>
  <button (click)="closeConnection()">close</button>
  </stottle-container>
  
  `
})
export class AppComponent implements OnInit {
  title = 'stottle.uk';

  constructor(
    private store: Store<AuthState>,
    private signalrService: SignalrService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      new fromAuthenticationActions.CheckAuthenticationStatus()
    );
  }

  closeConnection(): void {
    this.signalrService.stop(true).subscribe();
  }
}
