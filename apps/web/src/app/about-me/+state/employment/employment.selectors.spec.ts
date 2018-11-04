// import { Entity, EmploymentState } from './employment.reducer';
// import { employmentQuery } from './employment.selectors';

// describe('Employment Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getEmploymentId = it => it['id'];

//   let storeState;

//   beforeEach(() => {
//     const createEmployment = (id: string, name = ''): Entity => ({
//       id,
//       name: name || `name-${id}`
//     });
//     storeState = {
//       employment: {
//         list: [
//           createEmployment('PRODUCT-AAA'),
//           createEmployment('PRODUCT-BBB'),
//           createEmployment('PRODUCT-CCC')
//         ],
//         selectedId: 'PRODUCT-BBB',
//         error: ERROR_MSG,
//         loaded: true
//       }
//     };
//   });

//   describe('Employment Selectors', () => {
//     it('getAllEmployment() should return the list of Employment', () => {
//       const results = employmentQuery.selectAllEmployment(storeState);
//       const selId = getEmploymentId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelectedEmployment() should return the selected Entity', () => {
//       const result = employmentQuery.getSelectedEmployment(storeState);
//       const selId = getEmploymentId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getLoaded() should return the current 'loaded' status", () => {
//       const result = employmentQuery.getLoaded(storeState);

//       expect(result).toBe(true);
//     });

//     it("getError() should return the current 'error' storeState", () => {
//       const result = employmentQuery.getError(storeState);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
