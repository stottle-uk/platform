import { AuthenticationState } from '../authentication';
import { ChangePasswordState } from '../change-password';
import { CheckSessionState } from '../check-session';
import { UserInfoState } from '../user-info';

export interface AuthState {
  authentication: AuthenticationState;
  userInfo: UserInfoState;
  changePassword: ChangePasswordState;
  checkSession: CheckSessionState;
}

export interface Authentication extends auth0.Auth0DecodedHash {
  expiresAt: number;
  redirectUrl: string;
}

export const AUTH_FEATURE_KEY = 'auth';
