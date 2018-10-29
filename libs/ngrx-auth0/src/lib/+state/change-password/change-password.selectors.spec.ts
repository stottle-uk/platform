// import { Entity, ChangePasswordState } from './change-password.reducer';
// import { changePasswordQuery } from './change-password.selectors';

// describe('ChangePassword Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getChangePasswordId = it => it['id'];

//   let storeState;

//   beforeEach(() => {
//     const createChangePassword = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//     storeState = {
//       changePassword: {
//         list: [
//           createChangePassword('PRODUCT-AAA'),
//           createChangePassword('PRODUCT-BBB'),
//           createChangePassword('PRODUCT-CCC')
//         ],
//         selectedId: 'PRODUCT-BBB',
//         error: ERROR_MSG,
//         loaded: true
//       }
//     };
//   });

//   describe('ChangePassword Selectors', () => {
//     it('getAllChangePassword() should return the list of ChangePassword', () => {
//       const results = changePasswordQuery.getAllChangePassword(storeState);
//       const selId = getChangePasswordId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelectedChangePassword() should return the selected Entity', () => {
//       const result = changePasswordQuery.getSelectedChangePassword(storeState);
//       const selId = getChangePasswordId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getLoaded() should return the current 'loaded' status", () => {
//       const result = changePasswordQuery.getLoaded(storeState);

//       expect(result).toBe(true);
//     });

//     it("getError() should return the current 'error' storeState", () => {
//       const result = changePasswordQuery.getError(storeState);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
