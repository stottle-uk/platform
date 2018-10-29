import {
  ChangePasswordAction,
  ChangePasswordActionTypes
} from './change-password.actions';

export interface ChangePasswordState {
  changePasswordResponse: string;
  error: auth0.Auth0Error;
}

export const changePasswordInitialState: ChangePasswordState = {
  changePasswordResponse: null,
  error: null
};

export function changePasswordReducer(
  state: ChangePasswordState = changePasswordInitialState,
  action: ChangePasswordAction
): ChangePasswordState {
  switch (action.type) {
    case ChangePasswordActionTypes.ChangePasswordStart: {
      return {
        ...state,
        changePasswordResponse: null,
        error: null
      };
    }

    case ChangePasswordActionTypes.ChangePasswordSuccess: {
      return {
        ...state,
        changePasswordResponse: action.payload.response
      };
    }

    case ChangePasswordActionTypes.ChangePasswordFailure: {
      return {
        ...state,
        error: action.payload.error
      };
    }

    default:
      return state;
  }
}
