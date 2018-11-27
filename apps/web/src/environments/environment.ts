import { AuthOptions } from '@stottle-platform/ngx-auth0-wrapper';

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
