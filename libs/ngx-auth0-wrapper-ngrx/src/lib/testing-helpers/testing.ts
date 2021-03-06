import { Authentication } from '@stottle-platform/ngx-auth0-wrapper';
import {
  Auth0Error,
  Auth0UserProfile,
  AuthorizeOptions,
  ChangePasswordOptions
} from 'auth0-js';
import { AuthState } from '../+state';

export const redirectUrl = 'redirectUrl';
export const accessToken = 'accessToken';
export const expiresAt = 2;
export const userInfo: Auth0UserProfile = {
  clientID: 'clientID',
  created_at: 'created_at',
  identities: [],
  name: 'name',
  nickname: 'nickname',
  picture: 'picture',
  sub: 'sub',
  updated_at: '',
  user_id: 'user_id'
};

export const authorizationData: Authentication = {
  expiresAt: expiresAt,
  accessToken: accessToken,
  redirectUrl: redirectUrl
};

export const validTime: number = authorizationData.expiresAt + 1;
export const inValidTime: number = authorizationData.expiresAt - 1;

export const storeState: AuthState = {
  authentication: {
    authenticationStatusChecked: false
  },
  authorization: {
    authorizationData: authorizationData,
    error: null
  },
  changePassword: {
    changePasswordResponse: 'passwordChanged',
    error: null
  },
  checkSession: {
    checkedSession: false,
    checkingSession: false,
    checkSessionScheduled: false,
    error: null
  },
  userInfo: {
    error: {},
    loaded: false,
    loading: false,
    userInfo: userInfo
  }
};

export const auth0AuthorizeOptions: AuthorizeOptions = {
  scope: 'login'
};

export const auth0Error: Auth0Error = {
  code: '500'
};

export const auth0ChangePasswordOptions: ChangePasswordOptions = {
  connection: 'connection',
  email: 'email'
};
