import { Authentication } from '@stottle-platform/auth0-rxjs';
import {
  AuthenticationAction,
  AuthenticationActionTypes
} from './authentication.actions';

export interface AuthenticationState {
  authenticationData: Authentication;
  isAuthenticating: boolean;
  error: auth0.Auth0Error;
}

export const authenticationInitialState: AuthenticationState = {
  authenticationData: null,
  isAuthenticating: false,
  error: null
};

export function authenticationReducer(
  state: AuthenticationState = authenticationInitialState,
  action: AuthenticationAction
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.ClearLocalStorage:
    case AuthenticationActionTypes.Logout: {
      return authenticationInitialState;
    }

    case AuthenticationActionTypes.CheckAuthenticationStatus: {
      return {
        ...state,
        isAuthenticating: true
      };
    }

    case AuthenticationActionTypes.UserIsAuthenticated: {
      return {
        ...state,
        authenticationData: action.payload.auth,
        isAuthenticating: false,
        error: null
      };
    }

    case AuthenticationActionTypes.UserIsNotAuthenticated: {
      return {
        ...state,
        isAuthenticating: false
      };
    }

    case AuthenticationActionTypes.AuthenticationError: {
      return {
        ...state,
        error: action.payload.error,
        isAuthenticating: false
      };
    }

    default:
      return state;
  }
}
