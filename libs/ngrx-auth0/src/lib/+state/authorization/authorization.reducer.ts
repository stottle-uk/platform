import {
  AuthorizationAction,
  AuthorizationActionTypes
} from './authorization.actions';

export interface AuthorizationState {
  error: auth0.Auth0Error;
}

export const authorizationInitialState: AuthorizationState = {
  error: null
};

export function authorizationReducer(
  state: AuthorizationState = authorizationInitialState,
  action: AuthorizationAction
): AuthorizationState {
  switch (action.type) {
    case AuthorizationActionTypes.Logout: {
      return authorizationInitialState;
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
