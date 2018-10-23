import { AuthActions, AuthActionTypes } from './auth.actions';
import { Authentication } from './auth.model';

export interface State {
  auth: Authentication;
  userInfo: auth0.Auth0UserProfile;
  changePasswordResponse: string;
  error: auth0.Auth0Error;
}

export const initialState: State = {
  auth: null,
  userInfo: null,
  changePasswordResponse: null,
  error: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.ClearLocalStorage:
    case AuthActionTypes.Logout: {
      return initialState;
    }

    case AuthActionTypes.HandleAuthentication: {
      return {
        ...state,
        error: null,
        auth: action.payload.auth
      };
    }

    case AuthActionTypes.GetUserInfoSuccess: {
      return {
        ...state,
        userInfo: action.payload.userInfo
      };
    }

    case AuthActionTypes.ChangePasswordStart: {
      return {
        ...state,
        changePasswordResponse: null
      };
    }

    case AuthActionTypes.ChangePasswordSuccess: {
      return {
        ...state,
        changePasswordResponse: action.payload.response
      };
    }

    case AuthActionTypes.GetUserInfoFailure:
    case AuthActionTypes.ChangePasswordFailure:
    case AuthActionTypes.HandleAuthenticationError: {
      return {
        ...state,
        error: action.payload.error
      };
    }

    default:
      return state;
  }
}

export const getAuth = (state: State) => state.auth;
export const getUserInfo = (state: State) => state.userInfo;
export const getChangePasswordResponse = (state: State) => state.changePasswordResponse;
export const getError = (state: State) => state.error;
