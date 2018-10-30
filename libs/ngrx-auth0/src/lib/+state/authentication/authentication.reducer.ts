import { Authentication } from '@stottle-platform/auth0-rxjs';
import {
  AuthenticationAction,
  AuthenticationActionTypes
} from './authentication.actions';

export interface AuthenticationState {
  authenticationData: Authentication;
  checkingAuthenticationStatus: boolean;
}

export const authenticationInitialState: AuthenticationState = {
  authenticationData: null,
  checkingAuthenticationStatus: false
};

export function authenticationReducer(
  state: AuthenticationState = authenticationInitialState,
  action: AuthenticationAction
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.CheckAuthenticationStatus: {
      return {
        ...state,
        checkingAuthenticationStatus: true
      };
    }

    case AuthenticationActionTypes.UserIsAuthenticated: {
      return {
        ...state,
        checkingAuthenticationStatus: false
      };
    }

    case AuthenticationActionTypes.UserIsNotAuthenticated: {
      return {
        ...state,
        checkingAuthenticationStatus: false
      };
    }

    case AuthenticationActionTypes.SetAuthenticationState: {
      return {
        ...state,
        authenticationData: action.payload.auth
      };
    }

    case AuthenticationActionTypes.ClearLocalStorage: {
      return authenticationInitialState;
    }

    default:
      return state;
  }
}
