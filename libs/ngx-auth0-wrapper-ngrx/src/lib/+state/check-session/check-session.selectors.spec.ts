// import { Entity, CheckSessionState } from './check-session.reducer';
// import { checkSessionQuery } from './check-session.selectors';

// describe('CheckSession Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getCheckSessionId = it => it['id'];

//   let storeState;

//   beforeEach(() => {
//     const createCheckSession = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//     storeState = {
//       checkSession: {
//         list: [
//           createCheckSession('PRODUCT-AAA'),
//           createCheckSession('PRODUCT-BBB'),
//           createCheckSession('PRODUCT-CCC')
//         ],
//         selectedId: 'PRODUCT-BBB',
//         error: ERROR_MSG,
//         loaded: true
//       }
//     };
//   });

//   describe('CheckSession Selectors', () => {
//     it('getAllCheckSession() should return the list of CheckSession', () => {
//       const results = checkSessionQuery.getAllCheckSession(storeState);
//       const selId = getCheckSessionId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelectedCheckSession() should return the selected Entity', () => {
//       const result = checkSessionQuery.getSelectedCheckSession(storeState);
//       const selId = getCheckSessionId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getLoaded() should return the current 'loaded' status", () => {
//       const result = checkSessionQuery.getLoaded(storeState);

//       expect(result).toBe(true);
//     });

//     it("getError() should return the current 'error' storeState", () => {
//       const result = checkSessionQuery.getError(storeState);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
