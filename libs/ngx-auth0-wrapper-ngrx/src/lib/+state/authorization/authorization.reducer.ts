import { Authentication } from '@stottle-platform/ngx-auth0-wrapper';
import {
  AuthorizationAction,
  AuthorizationActionTypes
} from './authorization.actions';

export interface AuthorizationState {
  authorizationData: Authentication;
  error: auth0.Auth0Error;
}

export const authorizationInitialState: AuthorizationState = {
  authorizationData: null,
  error: null
};

export function authorizationReducer(
  state: AuthorizationState = authorizationInitialState,
  action: AuthorizationAction
): AuthorizationState {
  switch (action.type) {
    case AuthorizationActionTypes.ClearAuthenticationDetails:
    case AuthorizationActionTypes.Logout: {
      return authorizationInitialState;
    }

    case AuthorizationActionTypes.AuthenticationSuccess: {
      return {
        ...state,
        error: null,
        authorizationData: action.payload.auth
      };
    }

    case AuthorizationActionTypes.AuthenticationError: {
      return {
        ...state,
        error: action.payload.error
      };
    }
  }
  return state;
}
