import { AuthState } from '../+shared';
import { authorizationQuery } from './authorization.selectors';

describe('Authorization Selectors', () => {
  let storeState: AuthState;

  const authorizationData = {
    redirectUrl: '',
    expiresAt: 10
  };

  beforeEach(() => {
    storeState = {
      authentication: {
        checkingAuthenticationStatus: false
      },
      authorization: {
        authorizationData: authorizationData,
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

  describe('Authorization Selectors', () => {
    it('getAllAuthorization() should return the list of Authorization', () => {
      const data = authorizationQuery.selectAuthorizationData(storeState);

      expect(data).toBe(authorizationData);
    });
  });
});
