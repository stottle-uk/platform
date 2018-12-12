// import { ConnectToRealtimeSuccess } from './realtime.actions';
// import {
//   Entity,
//   initialState,
//   realtimeReducer,
//   RealtimeState
// } from './realtime.reducer';

// describe('Realtime Reducer', () => {
//   const getRealtimeId = it => it['id'];
//   let createRealtime;

//   beforeEach(() => {
//     createRealtime = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//   });
//   ConnectToRealtimeSuccess;

//   describe('valid Realtime actions ', () => {
//     it('should return set the list of known Realtime', () => {
//       const realtimes = [
//         createRealtime('PRODUCT-AAA'),
//         createRealtime('PRODUCT-zzz')
//       ];
//       const action = new RealtimeLoaded(realtimes);
//       const result: RealtimeState = realtimeReducer(initialState, action);
//       const selId: string = getRealtimeId(result.list[1]);

//       expect(result.loaded).toBe(true);
//       expect(result.list.length).toBe(2);
//       expect(selId).toBe('PRODUCT-zzz');
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the initial state', () => {
//       const action = {} as any;
//       const result = realtimeReducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });
