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
    it('selectAuthorizationData() should return Authorization data', () => {
      const data = authorizationQuery.selectAuthorizationData.projector(
        storeState.authorization
      );

      expect(data).toBe(authorizationData);
    });

    it('selectIsAuthenticated() should return true if access token is valid', () => {
      const isAuthenticated = authorizationQuery
        .selectIsAuthenticated(1)
        .projector({
          ...storeState.authorization,
          accessToken: 'accessToken',
          expiresAt: 2
        });

      expect(isAuthenticated).toBeTruthy();
    });

    it('selectIsAuthenticated() should return false if access token is invalid', () => {
      const isAuthenticated = authorizationQuery
        .selectIsAuthenticated(2)
        .projector({
          ...storeState.authorization,
          accessToken: 'accessToken',
          expiresAt: 1
        });

      expect(isAuthenticated).toBeFalsy();
    });

    it('selectAuthorizationError() should return authentication errors', () => {
      const error = authorizationQuery.selectAuthorizationError.projector({
        ...storeState.authorization,
        error: 'error'
      });

      expect(error).toBe('error');
    });
  });
});
