import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@stottle-platform-internal/ngrx-auth0';
import {
  changePasswordQuery,
  userInfoQuery
} from '@stottle-platform-internal/ngrx-auth0';

@Component({
  selector: 'stottle-dashboard',
  template: `
  <stottle-dashboard-inner
    [userInfo]="userInfo$ | async"
    [changePasswordResponse]="changePasswordResponse$ | async"
    (emailAddressSubmitted)="onEmailAddressSubmitted($event)"
  ></stottle-dashboard-inner>
  `,
  styles: []
})
export class DashboardComponent {
  userInfo$ = this.store.select(userInfoQuery.selectUserInfo);
  changePasswordResponse$ = this.store.select(
    changePasswordQuery.selectChangePasswordResponse
  );

  constructor(private store: Store<fromAuth.AuthState>) {}

  onEmailAddressSubmitted(email: string): void {
    this.store.dispatch(
      new fromAuth.ChangePasswordStart({
        options: {
          connection: 'Username-Password-Authentication',
          email
        }
      })
    );
  }
}
