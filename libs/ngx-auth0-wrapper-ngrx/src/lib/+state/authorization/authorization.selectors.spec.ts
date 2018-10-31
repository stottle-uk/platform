import {
  auth0Error,
  authorizationData,
  expiresAt,
  storeState
} from '../../testing-helpers/testing';
import { authorizationQuery } from './authorization.selectors';

describe('Authorization Selectors', () => {
  describe('Authorization Selectors', () => {
    it('selectAuthorizationData() should return Authorization data', () => {
      const data = authorizationQuery.selectAuthorizationData.projector(
        storeState.authorization
      );

      expect(data).toBe(authorizationData);
    });

    it('selectIsAuthenticated() should return true if access token is valid', () => {
      const isAuthenticated = authorizationQuery
        .selectIsAuthenticated(expiresAt)
        .projector({
          ...authorizationData,
          expiresAt: expiresAt + 1
        });

      expect(isAuthenticated).toBeTruthy();
    });

    it('selectIsAuthenticated() should return false if access token is invalid', () => {
      const isAuthenticated = authorizationQuery
        .selectIsAuthenticated(expiresAt)
        .projector({
          ...authorizationData,
          expiresAt: expiresAt - 1
        });

      expect(isAuthenticated).toBeFalsy();
    });

    it('selectAuthorizationError() should return authentication errors', () => {
      const error = authorizationQuery.selectAuthorizationError.projector({
        ...storeState.authorization,
        error: auth0Error
      });

      expect(error).toBe(auth0Error);
    });
  });
});
