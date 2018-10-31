// import { TestBed, async } from '@angular/core/testing';

// import { Observable } from 'rxjs';

// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import { provideMockActions } from '@ngrx/effects/testing';

// import { NxModule } from '@nrwl/nx';
// import { DataPersistence } from '@nrwl/nx';
// import { hot } from '@nrwl/nx/testing';

// import { AuthenticationEffects } from './authentication.effects';
// import {
//   LoadAuthentication,
//   AuthenticationLoaded
// } from './authentication.actions';

// describe('AuthenticationEffects', () => {
//   let actions: Observable<any>;
//   let effects: AuthenticationEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NxModule.forRoot(),
//         StoreModule.forRoot({}),
//         EffectsModule.forRoot([])
//       ],
//       providers: [
//         AuthenticationEffects,
//         DataPersistence,
//         provideMockActions(() => actions)
//       ]
//     });

//     effects = TestBed.get(AuthenticationEffects);
//   });

//   describe('loadAuthentication$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: new LoadAuthentication() });
//       expect(effects.loadAuthentication$).toBeObservable(
//         hot('-a-|', { a: new AuthenticationLoaded([]) })
//       );
//     });
//   });
// });
