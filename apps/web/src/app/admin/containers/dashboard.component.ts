import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@stottle-platform/ngrx-auth0';

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
  userInfo$ = this.store.select(fromAuth.selectUserInfo);
  changePasswordResponse$ = this.store.select(
    fromAuth.selectChangePasswordResponse
  );

  constructor(private store: Store<fromAuth.State>) {}

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
