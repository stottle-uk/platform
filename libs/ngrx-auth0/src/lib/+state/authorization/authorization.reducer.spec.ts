// import { AuthorizationLoaded } from './authorization.actions';
// import {
//   AuthorizationState,
//   Entity,
//   authorizationInitialState,
//   authorizationReducer
// } from './authorization.reducer';

// describe('Authorization Reducer', () => {
//   const getAuthorizationId = it => it['id'];
//   let createAuthorization;

//   beforeEach(() => {
//     createAuthorization = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//   });

//   describe('valid Authorization actions ', () => {
//     it('should return set the list of known Authorization', () => {
//       const authorizations = [
//         createAuthorization('PRODUCT-AAA'),
//         createAuthorization('PRODUCT-zzz')
//       ];
//       const action = new AuthorizationLoaded(authorizations);
//       const result: AuthorizationState = authorizationReducer(
//         authorizationInitialState,
//         action
//       );
//       const selId: string = getAuthorizationId(result.list[1]);

//       expect(result.loaded).toBe(true);
//       expect(result.list.length).toBe(2);
//       expect(selId).toBe('PRODUCT-zzz');
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the initial state', () => {
//       const action = {} as any;
//       const result = authorizationReducer(authorizationInitialState, action);

//       expect(result).toBe(authorizationInitialState);
//     });
//   });
// });
