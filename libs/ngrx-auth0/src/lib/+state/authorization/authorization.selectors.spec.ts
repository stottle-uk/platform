import { Entity, AuthorizationState } from './authorization.reducer';
import { authorizationQuery } from './authorization.selectors';

describe('Authorization Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAuthorizationId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createAuthorization = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      authorization: {
        list: [
          createAuthorization('PRODUCT-AAA'),
          createAuthorization('PRODUCT-BBB'),
          createAuthorization('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Authorization Selectors', () => {
    it('getAllAuthorization() should return the list of Authorization', () => {
      const results = authorizationQuery.getAllAuthorization(storeState);
      const selId = getAuthorizationId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedAuthorization() should return the selected Entity', () => {
      const result = authorizationQuery.getSelectedAuthorization(storeState);
      const selId = getAuthorizationId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = authorizationQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = authorizationQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
