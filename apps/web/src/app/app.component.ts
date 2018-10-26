import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@stottle-platform-internal/ngrx-auth0';

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

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromAuth.CheckAuthenticationStatus());
  }
}
