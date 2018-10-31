import { Authentication } from '@stottle-platform/ngx-auth0-wrapper';
import { Auth0Error, AuthorizeOptions } from 'auth0-js';
import { AuthState } from '../+state';

export const redirectUrl = 'redirectUrl';
export const accessToken = 'accessToken';
export const expiresAt = 2;

export const authorizationData: Authentication = {
  expiresAt: expiresAt,
  accessToken: accessToken,
  redirectUrl: redirectUrl
};

export const validTime: number = authorizationData.expiresAt + 1;
export const inValidTime: number = authorizationData.expiresAt - 1;

export const storeState: AuthState = {
  authentication: {
    checkingAuthenticationStatus: false
  },
  authorization: {
    authorizationData: authorizationData,
    error: {}
  },
  changePassword: {
    changePasswordResponse: '',
    error: {}
  },
  checkSession: {
    checkedSession: false,
    checkingSession: false,
    checkSessionScheduled: false,
    error: {}
  },
  userInfo: {
    error: {},
    loaded: false,
    loading: false,
    userInfo: {
      clientID: '',
      created_at: '',
      identities: [],
      name: '',
      nickname: '',
      picture: '',
      sub: '',
      updated_at: '',
      user_id: ''
    }
  }
};

export const auth0AuthorizeOptions: AuthorizeOptions = {
  scope: 'login'
};

export const auth0Error: Auth0Error = {
  code: '500'
};
