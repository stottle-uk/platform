import { AuthState } from '../+shared';
import { authenticationQuery } from './authentication.selectors';

describe('Authentication Selectors', () => {
  let storeState: AuthState;

  beforeEach(() => {
    storeState = {
      authentication: {
        checkingAuthenticationStatus: false
      },
      authorization: {
        authorizationData: {
          expiresAt: 0,
          redirectUrl: ''
        },
        error: {}
      },
      changePassword: {
        changePasswordResponse: '',
        error: {}
      },
      checkSession: {
        checkedSession: false,
        checkingSession: false,
        checkSessionScheduled: false,
        error: {}
      },
      userInfo: {
        error: {},
        loaded: false,
        loading: false,
        userInfo: {
          clientID: '',
          created_at: '',
          identities: [],
          name: '',
          nickname: '',
          picture: '',
          sub: '',
          updated_at: '',
          user_id: ''
        }
      }
    };
  });

  describe('Authentication Selectors', () => {
    it('selectCheckingAuthenticationStatus() should return checkingAuthenticationStatus', () => {
      const result = authenticationQuery.selectCheckingAuthenticationStatus.projector(
        storeState.authentication
      );

      expect(result).toBe(
        storeState.authentication.checkingAuthenticationStatus
      );
    });
  });
});
