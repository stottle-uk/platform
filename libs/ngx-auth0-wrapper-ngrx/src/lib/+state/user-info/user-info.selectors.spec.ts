// import { Entity, UserInfoState } from './user-info.reducer';
// import { userInfoQuery } from './user-info.selectors';

// describe('UserInfo Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getUserInfoId = it => it['id'];

//   let storeState;

//   beforeEach(() => {
//     const createUserInfo = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//     storeState = {
//       userInfo: {
//         list: [
//           createUserInfo('PRODUCT-AAA'),
//           createUserInfo('PRODUCT-BBB'),
//           createUserInfo('PRODUCT-CCC')
//         ],
//         selectedId: 'PRODUCT-BBB',
//         error: ERROR_MSG,
//         loaded: true
//       }
//     };
//   });

//   describe('UserInfo Selectors', () => {
//     it('getAllUserInfo() should return the list of UserInfo', () => {
//       const results = userInfoQuery.getAllUserInfo(storeState);
//       const selId = getUserInfoId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelectedUserInfo() should return the selected Entity', () => {
//       const result = userInfoQuery.getSelectedUserInfo(storeState);
//       const selId = getUserInfoId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getLoaded() should return the current 'loaded' status", () => {
//       const result = userInfoQuery.getLoaded(storeState);

//       expect(result).toBe(true);
//     });

//     it("getError() should return the current 'error' storeState", () => {
//       const result = userInfoQuery.getError(storeState);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
