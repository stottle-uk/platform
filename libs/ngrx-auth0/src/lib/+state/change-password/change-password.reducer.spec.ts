// import { ChangePasswordLoaded } from './change-password.actions';
// import {
//   ChangePasswordState,
//   Entity,
//   initialState,
//   changePasswordReducer
// } from './change-password.reducer';

// describe('ChangePassword Reducer', () => {
//   const getChangePasswordId = it => it['id'];
//   let createChangePassword;

//   beforeEach(() => {
//     createChangePassword = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//   });

//   describe('valid ChangePassword actions ', () => {
//     it('should return set the list of known ChangePassword', () => {
//       const changePasswords = [
//         createChangePassword('PRODUCT-AAA'),
//         createChangePassword('PRODUCT-zzz')
//       ];
//       const action = new ChangePasswordLoaded(changePasswords);
//       const result: ChangePasswordState = changePasswordReducer(
//         initialState,
//         action
//       );
//       const selId: string = getChangePasswordId(result.list[1]);

//       expect(result.loaded).toBe(true);
//       expect(result.list.length).toBe(2);
//       expect(selId).toBe('PRODUCT-zzz');
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the initial state', () => {
//       const action = {} as any;
//       const result = changePasswordReducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });
