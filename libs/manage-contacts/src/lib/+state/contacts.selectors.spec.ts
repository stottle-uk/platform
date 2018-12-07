// import { Entity, RealtimeState } from './contacts.reducer';
// import { realtimeQuery } from './contacts.selectors';

// describe('Realtime Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getRealtimeId = it => it['id'];

//   let storeState;

//   beforeEach(() => {
//     const createRealtime = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//     storeState = {
//       realtime: {
//         list: [
//           createRealtime('PRODUCT-AAA'),
//           createRealtime('PRODUCT-BBB'),
//           createRealtime('PRODUCT-CCC')
//         ],
//         selectedId: 'PRODUCT-BBB',
//         error: ERROR_MSG,
//         loaded: true
//       }
//     };
//   });

//   describe('Realtime Selectors', () => {
//     it('getAllRealtime() should return the list of Realtime', () => {
//       const results = realtimeQuery.getAllRealtime(storeState);
//       const selId = getRealtimeId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelectedRealtime() should return the selected Entity', () => {
//       const result = realtimeQuery.getSelectedRealtime(storeState);
//       const selId = getRealtimeId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getLoaded() should return the current 'loaded' status", () => {
//       const result = realtimeQuery.getLoaded(storeState);

//       expect(result).toBe(true);
//     });

//     it("getError() should return the current 'error' storeState", () => {
//       const result = realtimeQuery.getError(storeState);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
