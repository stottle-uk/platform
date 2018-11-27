import {
  AuthenticationAction,
  AuthenticationActionTypes
} from './authentication.actions';

export interface AuthenticationState {
  authenticationStatusChecked: boolean;
}

export const authenticationInitialState: AuthenticationState = {
  authenticationStatusChecked: false
};

export function authenticationReducer(
  state: AuthenticationState = authenticationInitialState,
  action: AuthenticationAction
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.CheckAuthenticationStatus: {
      return {
        ...state,
        authenticationStatusChecked: false
      };
    }

    case AuthenticationActionTypes.UserIsAuthenticated: {
      return {
        ...state,
        authenticationStatusChecked: true
      };
    }

    case AuthenticationActionTypes.UserIsNotAuthenticated: {
      return {
        ...state,
        authenticationStatusChecked: true
      };
    }

    default:
      return state;
  }
}
