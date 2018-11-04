// import { GetEmplymentHistorySuccess } from './employment.actions';
// import {
//   EmploymentState,
//   Entity,
//   initialState,
//   employmentReducer
// } from './employment.reducer';

// describe('Employment Reducer', () => {
//   const getEmploymentId = it => it['id'];
//   let createEmployment;

//   beforeEach(() => {
//     createEmployment = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//   });

//   describe('valid Employment actions ', () => {
//     it('should return set the list of known Employment', () => {
//       const employments = [
//         createEmployment('PRODUCT-AAA'),
//         createEmployment('PRODUCT-zzz')
//       ];
//       const action = new GetEmplymentHistorySuccess(employments);
//       const result: EmploymentState = employmentReducer(initialState, action);
//       const selId: string = getEmploymentId(result.list[1]);

//       expect(result.loaded).toBe(true);
//       expect(result.list.length).toBe(2);
//       expect(selId).toBe('PRODUCT-zzz');
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the initial state', () => {
//       const action = {} as any;
//       const result = employmentReducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });
