import { AuthenticationState } from '../authentication';
import { AuthorizationState } from '../authorization/authorization.reducer';
import { ChangePasswordState } from '../change-password';
import { CheckSessionState } from '../check-session';
import { UserInfoState } from '../user-info';

export interface AuthState {
  authentication: AuthenticationState;
  authorization: AuthorizationState;
  changePassword: ChangePasswordState;
  checkSession: CheckSessionState;
  userInfo: UserInfoState;
}

export const AUTH_FEATURE_KEY = 'auth';
