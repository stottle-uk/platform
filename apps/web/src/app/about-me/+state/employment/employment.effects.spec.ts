// import { TestBed } from '@angular/core/testing';
// import { EffectsModule } from '@ngrx/effects';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { StoreModule } from '@ngrx/store';
// import { DataPersistence, NxModule } from '@nrwl/nx';
// import { hot } from '@nrwl/nx/testing';
// import { Observable } from 'rxjs';
// import {
//   GetEmploymentHistoryStart,
//   GetEmploymentHistorySuccess
// } from './employment.actions';
// import { EmploymentEffects } from './employment.effects';

// describe('EmploymentEffects', () => {
//   let actions: Observable<any>;
//   let effects: EmploymentEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NxModule.forRoot(),
//         StoreModule.forRoot({}),
//         EffectsModule.forRoot([])
//       ],
//       providers: [
//         EmploymentEffects,
//         DataPersistence,
//         provideMockActions(() => actions)
//       ]
//     });

//     effects = TestBed.get(EmploymentEffects);
//   });

//   describe('loadEmployment$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: new GetEmploymentHistoryStart() });
//       expect(effects.loadEmployment$).toBeObservable(
//         hot('-a-|', { a: new GetEmploymentHistorySuccess([]) })
//       );
//     });
//   });
// });
