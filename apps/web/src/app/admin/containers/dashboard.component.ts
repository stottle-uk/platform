import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AuthState,
  changePasswordQuery,
  fromChangePasswordActions,
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
  userInfo$ = this.store.pipe(select(userInfoQuery.selectUserInfo));
  changePasswordResponse$ = this.store.pipe(
    select(changePasswordQuery.selectChangePasswordResponse)
  );

  constructor(private store: Store<AuthState>) {}

  onEmailAddressSubmitted(email: string): void {
    this.store.dispatch(
      new fromChangePasswordActions.ChangePasswordStart({
        options: {
          connection: 'Username-Password-Authentication',
          email
        }
      })
    );
  }
}
