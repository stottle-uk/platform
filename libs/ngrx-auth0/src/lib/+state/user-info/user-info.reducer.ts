import { UserInfoAction, UserInfoActionTypes } from './user-info.actions';

export const USERINFO_FEATURE_KEY = 'userInfo';

export interface UserInfoState {
  userInfo: auth0.Auth0UserProfile;
  loading: boolean;
  loaded: boolean;
  error: auth0.Auth0Error;
}

export interface UserInfoPartialState {
  readonly [USERINFO_FEATURE_KEY]: UserInfoState;
}

export const userInfoInitialState: UserInfoState = {
  userInfo: null,
  loading: false,
  loaded: false,
  error: null
};

export function userInfoReducer(
  state: UserInfoState = userInfoInitialState,
  action: UserInfoAction
): UserInfoState {
  switch (action.type) {
    case UserInfoActionTypes.GetUserInfoStart: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }

    case UserInfoActionTypes.GetUserInfoSuccess: {
      return {
        ...state,
        userInfo: action.payload.userInfo,
        loaded: true,
        loading: false
      };
    }

    case UserInfoActionTypes.GetUserInfoFailure: {
      return {
        ...state,
        error: action.payload.error,
        loaded: true,
        loading: false
      };
    }

    default:
      return state;
  }
}
