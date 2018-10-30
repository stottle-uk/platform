import { Authentication } from '@stottle-platform/auth0-rxjs';
import {
  AuthenticationAction,
  AuthenticationActionTypes
} from './authentication.actions';

export interface AuthenticationState {
  authenticationData: Authentication;
  checkingAuthenticationStatus: boolean;
  error: auth0.Auth0Error;
}

export const authenticationInitialState: AuthenticationState = {
  authenticationData: null,
  checkingAuthenticationStatus: false,
  error: null
};

export function authenticationReducer(
  state: AuthenticationState = authenticationInitialState,
  action: AuthenticationAction
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.ClearLocalStorage: {
      return authenticationInitialState;
    }

    case AuthenticationActionTypes.CheckAuthenticationStatus: {
      return {
        ...state,
        checkingAuthenticationStatus: true
      };
    }

    case AuthenticationActionTypes.UserIsAuthenticated: {
      return {
        ...state,
        authenticationData: action.payload.auth,
        checkingAuthenticationStatus: false,
        error: null
      };
    }

    case AuthenticationActionTypes.UserIsNotAuthenticated: {
      return {
        ...state,
        checkingAuthenticationStatus: false
      };
    }

    default:
      return state;
  }
}
