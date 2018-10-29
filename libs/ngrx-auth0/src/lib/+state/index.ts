import { ActionReducerMap } from '@ngrx/store';
import { State } from './+shared/auth.modesl';
import { AuthenticationEffects, authenticationReducer } from './authentication';
import {
  ChangePasswordEffects,
  changePasswordReducer
} from './change-password';
import { CheckSessionEffects, checkSessionReducer } from './check-session';
import { UserInfoEffects, userInfoReducer } from './user-info';

export * from './authentication';
export * from './change-password';
export * from './check-session';
export * from './user-info';

export const authReducers: ActionReducerMap<State> = {
  authentication: authenticationReducer,
  userInfo: userInfoReducer,
  changePassword: changePasswordReducer,
  checkSession: checkSessionReducer
};

export const authEffects = [
  AuthenticationEffects,
  UserInfoEffects,
  ChangePasswordEffects,
  CheckSessionEffects
];
