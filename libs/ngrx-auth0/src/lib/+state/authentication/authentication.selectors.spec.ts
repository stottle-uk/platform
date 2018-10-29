// describe('Authentication Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getAuthenticationId = it => it['id'];

//   let storeState;

//   beforeEach(() => {
//     const createAuthentication = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//     storeState = {
//       authentication: {
//         list: [
//           createAuthentication('PRODUCT-AAA'),
//           createAuthentication('PRODUCT-BBB'),
//           createAuthentication('PRODUCT-CCC')
//         ],
//         selectedId: 'PRODUCT-BBB',
//         error: ERROR_MSG,
//         loaded: true
//       }
//     };
//   });

//   describe('Authentication Selectors', () => {
//     it('getAllAuthentication() should return the list of Authentication', () => {
//       const results = authenticationQuery.getAllAuthentication(storeState);
//       const selId = getAuthenticationId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelectedAuthentication() should return the selected Entity', () => {
//       const result = authenticationQuery.getSelectedAuthentication(storeState);
//       const selId = getAuthenticationId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getLoaded() should return the current 'loaded' status", () => {
//       const result = authenticationQuery.getLoaded(storeState);

//       expect(result).toBe(true);
//     });

//     it("getError() should return the current 'error' storeState", () => {
//       const result = authenticationQuery.getError(storeState);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
