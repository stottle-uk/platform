import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from './+shared/auth.models';
import { AuthenticationEffects, authenticationReducer } from './authentication';
import { AuthorizationEffects, authorizationReducer } from './authorization';
import {
  ChangePasswordEffects,
  changePasswordReducer
} from './change-password';
import { CheckSessionEffects, checkSessionReducer } from './check-session';
import { UserInfoEffects, userInfoReducer } from './user-info';

export * from './+shared';
export * from './authentication';
export * from './authorization';
export * from './change-password';
export * from './check-session';
export * from './user-info';

export const authReducers: ActionReducerMap<AuthState> = {
  authentication: authenticationReducer,
  authorization: authorizationReducer,
  changePassword: changePasswordReducer,
  checkSession: checkSessionReducer,
  userInfo: userInfoReducer
};

export const authEffects = [
  AuthenticationEffects,
  AuthorizationEffects,
  ChangePasswordEffects,
  CheckSessionEffects,
  UserInfoEffects
];
