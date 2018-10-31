// import { TestBed, async } from '@angular/core/testing';

// import { Observable } from 'rxjs';

// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import { provideMockActions } from '@ngrx/effects/testing';

// import { NxModule } from '@nrwl/nx';
// import { DataPersistence } from '@nrwl/nx';
// import { hot } from '@nrwl/nx/testing';

// import { ChangePasswordEffects } from './change-password.effects';
// import {
//   LoadChangePassword,
//   ChangePasswordLoaded
// } from './change-password.actions';

// describe('ChangePasswordEffects', () => {
//   let actions: Observable<any>;
//   let effects: ChangePasswordEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NxModule.forRoot(),
//         StoreModule.forRoot({}),
//         EffectsModule.forRoot([])
//       ],
//       providers: [
//         ChangePasswordEffects,
//         DataPersistence,
//         provideMockActions(() => actions)
//       ]
//     });

//     effects = TestBed.get(ChangePasswordEffects);
//   });

//   describe('loadChangePassword$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: new LoadChangePassword() });
//       expect(effects.loadChangePassword$).toBeObservable(
//         hot('-a-|', { a: new ChangePasswordLoaded([]) })
//       );
//     });
//   });
// });
