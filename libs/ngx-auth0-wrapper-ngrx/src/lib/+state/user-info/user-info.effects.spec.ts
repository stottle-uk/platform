// import { TestBed, async } from '@angular/core/testing';

// import { Observable } from 'rxjs';

// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import { provideMockActions } from '@ngrx/effects/testing';

// import { NxModule } from '@nrwl/nx';
// import { DataPersistence } from '@nrwl/nx';
// import { hot } from '@nrwl/nx/testing';

// import { UserInfoEffects } from './user-info.effects';
// import { LoadUserInfo, UserInfoLoaded } from './user-info.actions';

// describe('UserInfoEffects', () => {
//   let actions: Observable<any>;
//   let effects: UserInfoEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NxModule.forRoot(),
//         StoreModule.forRoot({}),
//         EffectsModule.forRoot([])
//       ],
//       providers: [
//         UserInfoEffects,
//         DataPersistence,
//         provideMockActions(() => actions)
//       ]
//     });

//     effects = TestBed.get(UserInfoEffects);
//   });

//   describe('loadUserInfo$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: new LoadUserInfo() });
//       expect(effects.loadUserInfo$).toBeObservable(
//         hot('-a-|', { a: new UserInfoLoaded([]) })
//       );
//     });
//   });
// });
