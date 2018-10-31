import {
  AuthenticationError,
  AuthenticationSuccess,
  ClearAuthenticationDetails,
  Logout
} from './authorization.actions';
import {
  authorizationInitialState,
  authorizationReducer,
  AuthorizationState
} from './authorization.reducer';

describe('Authorization Reducer', () => {
  let populatedState: AuthorizationState;

  beforeEach(() => {
    populatedState = {
      authorizationData: {
        redirectUrl: '',
        expiresAt: 1
      },
      error: null
    };
  });

  describe('valid Authorization actions ', () => {
    it('should return initial state for ClearAuthenticationDetails', () => {
      const action = new ClearAuthenticationDetails();
      const result: AuthorizationState = authorizationReducer(
        populatedState,
        action
      );

      expect(result).toBe(authorizationInitialState);
    });

    it('should return initial state for logout', () => {
      const action = new Logout();
      const result: AuthorizationState = authorizationReducer(
        populatedState,
        action
      );

      expect(result).toBe(authorizationInitialState);
    });

    it('should set authentication data for AuthenticationSuccess', () => {
      const action = new AuthenticationSuccess({
        auth: populatedState.authorizationData
      });
      const result: AuthorizationState = authorizationReducer(
        authorizationInitialState,
        action
      );

      expect(result.authorizationData).toBe(action.payload.auth);
      expect(result.error).toBeNull();
    });

    it('should set error for AuthenticationError', () => {
      const action = new AuthenticationError({
        error: {
          code: '500'
        }
      });
      const result: AuthorizationState = authorizationReducer(
        authorizationInitialState,
        action
      );

      expect(result.error).toBe(action.payload.error);
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = authorizationReducer(authorizationInitialState, action);

      expect(result).toBe(authorizationInitialState);
    });
  });
});
