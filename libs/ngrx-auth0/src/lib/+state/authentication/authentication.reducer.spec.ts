// import { AuthenticationLoaded } from './authentication.actions';
// import { authenticationInitialState, authenticationReducer, AuthenticationState, Entity } from './authentication.reducer';

// describe('Authentication Reducer', () => {
//   const getAuthenticationId = it => it['id'];
//   let createAuthentication;

//   beforeEach(() => {
//     createAuthentication = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//   });

//   describe('valid Authentication actions ', () => {
//     it('should return set the list of known Authentication', () => {
//       const authentications = [
//         createAuthentication('PRODUCT-AAA'),
//         createAuthentication('PRODUCT-zzz')
//       ];
//       const action = new AuthenticationLoaded(authentications);
//       const result: AuthenticationState = authenticationReducer(
//         authenticationInitialState,
//         action
//       );
//       const selId: string = getAuthenticationId(result.list[1]);

//       expect(result.loaded).toBe(true);
//       expect(result.list.length).toBe(2);
//       expect(selId).toBe('PRODUCT-zzz');
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the initial state', () => {
//       const action = {} as any;
//       const result = authenticationReducer(authenticationInitialState, action);

//       expect(result).toBe(authenticationInitialState);
//     });
//   });
// });
