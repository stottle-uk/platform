import { storeState } from '../../testing-helpers/testing';
import { authenticationQuery } from './authentication.selectors';

describe('Authentication Selectors', () => {
  describe('Authentication Selectors', () => {
    it('selectCheckingAuthenticationStatus() should return checkingAuthenticationStatus', () => {
      const result = authenticationQuery.selectAuthenticationStatusChecked.projector(
        storeState.authentication
      );

      expect(result).toBe(
        storeState.authentication.authenticationStatusChecked
      );
    });
  });
});
