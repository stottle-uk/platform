import { AuthOptions } from '@stottle-platform/ngx-auth0-wrapper';

export const environment = {
  production: true
};

export const authOptions: AuthOptions = {
  options: {
    clientID: 'gc3YpcUt64cC655TKbfiv9Pimon2c9V2',
    domain: 'stottle.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://stottle.co.uk/callback',
    scope: 'openid profile email',
    audience: 'https://stottle-auth0-ngrx-api/'
  },
  logoutOptions: {
    returnTo: 'https://stottle.co.uk'
  },
  localStoragePrefix: 'stottle-web',
  sessionRenewalInterval: 30 * 60000
};
