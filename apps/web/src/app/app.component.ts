import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthState,
  fromAuthenticationActions
} from '@stottle-platform/ngx-auth0-wrapper-ngrx';

@Component({
  selector: 'stottle-platform-root',
  template: `
  <stottle-container>
    <router-outlet></router-outlet>
  </stottle-container>
  `
})
export class AppComponent implements OnInit {
  title = 'stottle.uk';

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      new fromAuthenticationActions.CheckAuthenticationStatus()
    );
  }
}
