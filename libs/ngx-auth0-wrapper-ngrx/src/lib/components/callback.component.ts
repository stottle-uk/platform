import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, fromAuthorizationActions } from '../+state';

@Component({
  selector: 'stottle-platform-callback',
  template: `<p>loading...</p>`,
  styles: []
})
export class CallbackComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromAuthorizationActions.AuthenticationComplete());
  }
}
