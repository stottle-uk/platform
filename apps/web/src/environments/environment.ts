import { AuthOptions, LogoutOptions } from 'auth0-js';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const authOptions: AuthOptions = {
  clientID: 'gc3YpcUt64cC655TKbfiv9Pimon2c9V2',
  domain: 'stottle.eu.auth0.com',
  responseType: 'token id_token',
  redirectUri: 'http://localhost:4200/callback',
  scope: 'openid profile email',
  audience: 'https://stottle-auth0-ngrx-api/'
};

export const authLogoutOptions: LogoutOptions = {
  returnTo: 'http://localhost:4200'
};
