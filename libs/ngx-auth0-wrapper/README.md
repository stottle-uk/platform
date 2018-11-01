# @stottle-platform/ngx-auth0-wrapper

An Angular service which wraps selected methods from the auth0-js library to use observables.

It has been tested with Angular 6.x.x and is complete with unit tests.

If you want to read the full API documentation of auth0.js, see [here](https://auth0.github.io/auth0.js/index.html).

### Installing and usage

```bash
npm install @stottle-platform/ngx-auth0-wrapper auth0-js
```

#### Load the module for your app (with auth0 options):

Import the `NgxAuth0WrapperModule` in your root module and provide the options. The `AuthOptions` could go into your environment.\*.ts files.

The `options` and `logoutOptions` use the modals from the Auth0-js library.

```javascript
import { NgxAuth0WrapperModule } from 'stottle-platform/ngx-auth0-wrapper';
import { AuthOptions } from '@stottle-platform/ngx-auth0-wrapper';

const authOptions: AuthOptions = {
  options: {
    clientID: 'clientId',
    domain: 'domain',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile',
    audience: 'audience'
  },
  logoutOptions: {
    returnTo: 'http://localhost:4200'
  },
  localStoragePrefix: 'local-storage-prefix',
  sessionRenewalInterval: 30 * 60000
};

@NgModule({
  ...
  imports: [
    ...
    NgxAuth0WrapperModule.forRoot(authOptions),
  ]
})
```

Call the authorize method in a component to display the hosted login/signUp forms

```javascript
import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from '@stottle-platform/ngx-auth0-wrapper';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app',
  template: `<button (click)="authorize()">Signup</button>`
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthProviderService) {}

  ngOnInit(): void {
    this.auth.handleAuthentication().pipe(
      tap(authentication => console.log(authentication))
    ).subscribe() // handle authentication stores the access token in local storage
  }

  authorize(): void {
    this.auth.authorize({
      mode: "signUp"
    })
  }
}
```

### AuthProviderService API

| Auth0 Docs                                                                    | Package Method                                                       |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [authorize](https://auth0.github.io/auth0.js/global.html#authorize)           | `authorize(options: AuthorizeOptions): void`                         |
| [logout](https://auth0.github.io/auth0.js/global.html#logout)                 | `logout(options?: LogoutOptions): void`                              |
| [parseHash](https://auth0.github.io/auth0.js/global.html#parseHash)           | `handleAuthentication(): Observable<Authentication>`                 |
| [checkSession](https://auth0.github.io/auth0.js/global.html#checkSession)     | `checkSession(): Observable<Authentication>`                         |
| [changePassword](https://auth0.github.io/auth0.js/global.html#changePassword) | `changePassword(options: ChangePasswordOptions): Obersvable<string>` |
| [getUserInfo](https://auth0.github.io/auth0.js/global.html#userInfo)          | `getUserInfo(): Observable<Auth0UserProfile>`                        |
| n/a                                                                           | `scheduleSessionCheck(): Observable<number>`                         |
| n/a                                                                           | `clearLocalStorage(): void`                                          |
| n/a                                                                           | `getAuthState(): Authentication`\*                                   |

\* getAuthState() returns values from local storage

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.

For auth0 related questions/support please use the [Support Center](https://support.auth0.com).

## Author

[stottle](https://stottle.uk)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
