// import { CheckSessionLoaded } from './check-session.actions';
// import {
//   CheckSessionState,
//   Entity,
//   checkSessionInitialState,
//   checkSessionReducer
// } from './check-session.reducer';

// describe('CheckSession Reducer', () => {
//   const getCheckSessionId = it => it['id'];
//   let createCheckSession;

//   beforeEach(() => {
//     createCheckSession = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//   });

//   describe('valid CheckSession actions ', () => {
//     it('should return set the list of known CheckSession', () => {
//       const checkSessions = [
//         createCheckSession('PRODUCT-AAA'),
//         createCheckSession('PRODUCT-zzz')
//       ];
//       const action = new CheckSessionLoaded(checkSessions);
//       const result: CheckSessionState = checkSessionReducer(
//         checkSessionInitialState,
//         action
//       );
//       const selId: string = getCheckSessionId(result.list[1]);

//       expect(result.loaded).toBe(true);
//       expect(result.list.length).toBe(2);
//       expect(selId).toBe('PRODUCT-zzz');
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the initial state', () => {
//       const action = {} as any;
//       const result = checkSessionReducer(checkSessionInitialState, action);

//       expect(result).toBe(checkSessionInitialState);
//     });
//   });
// });
