# @stottle-platform/ngx-auth0-wrapper-ngrx

An Angular service which wraps selected methods from the auth0-js library to use observables and stores authentication data in NGRX.

I have written a medium article explaining how the library works. [Angular - Authentication with Auth0 and NGRX](https://medium.com/@stuarttottle)

Also includes

- CallbackComponent
- AuthGuardService
- HttpInterceptorService

It has been tested with Angular 6.x.x and is complete with unit tests.

If you want to read the full API documentation of auth0.js, see [here](https://auth0.github.io/auth0.js/index.html).

### Installing and usage

The package requires that you are already using NGRX in your application and have imported the StoreModule etc into your root module

```bash
npm install @stottle-platform/ngx-auth0-wrapper-ngrx @stottle-platform-wrapper auth0-js
```

#### Load the module for your app (with auth0 options):

Import the `NgxAuth0WrapperNgrxModule` in your root module and provide the options. The `AuthOptions` could go into your environment.\*.ts files.

The `options` and `logoutOptions` use the modals from the Auth0-js library.

```javascript
import { NgxAuth0WrapperNgrxModule } from 'stottle-platform/ngx-auth0-wrapper-ngrx';
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
    NgxAuth0WrapperNgrxModule.forRoot(authOptions),
  ]
})
```

Listen for the actions that have been dispatch by the library in your own effects and use the selectors to retrieve the data.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.

For auth0 related questions/support please use the [Support Center](https://support.auth0.com).

## Author

[stottle](https://stottle.uk)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
