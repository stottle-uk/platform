import {
  CheckAuthenticationStatus,
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from './authentication.actions';
import {
  authenticationInitialState,
  authenticationReducer,
  AuthenticationState
} from './authentication.reducer';

describe('Authentication Reducer', () => {
  let populatedState: AuthenticationState;

  beforeEach(() => {
    populatedState = {
      checkingAuthenticationStatus: true
    };
  });

  describe('valid Authentication actions ', () => {
    it('should set checkingAuthenticationStatus to true for CheckAuthenticationStatus', () => {
      const action = new CheckAuthenticationStatus();
      const result: AuthenticationState = authenticationReducer(
        authenticationInitialState,
        action
      );

      expect(result.checkingAuthenticationStatus).toBe(true);
    });

    it('should set checkingAuthenticationStatus to false for UserIsAuthenticated', () => {
      const action = new UserIsAuthenticated();
      const result: AuthenticationState = authenticationReducer(
        populatedState,
        action
      );

      expect(result.checkingAuthenticationStatus).toBe(false);
    });

    it('should set checkingAuthenticationStatus to false for UserIsAuthenticated', () => {
      const action = new UserIsNotAuthenticated();
      const result: AuthenticationState = authenticationReducer(
        populatedState,
        action
      );

      expect(result.checkingAuthenticationStatus).toBe(false);
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = authenticationReducer(undefined, action);

      expect(result).toBe(authenticationInitialState);
    });
  });
});
