import {
  AuthenticationAction,
  AuthenticationActionTypes
} from './authentication.actions';

export interface AuthenticationState {
  checkingAuthenticationStatus: boolean;
}

export const authenticationInitialState: AuthenticationState = {
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

    default:
      return state;
  }
}
