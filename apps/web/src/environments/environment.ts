import { AuthOptions } from '@stottle-platform/auth0-rxjs';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const authOptions: AuthOptions = {
  options: {
    clientID: 'gc3YpcUt64cC655TKbfiv9Pimon2c9V2',
    domain: 'stottle.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email',
    audience: 'https://stottle-auth0-ngrx-api/'
  },
  logoutOptions: {
    returnTo: 'http://localhost:4200'
  },
  localStoragePrefix: 'stottle-web',
  sessionRenewalInterval: 30 * 60000
};
