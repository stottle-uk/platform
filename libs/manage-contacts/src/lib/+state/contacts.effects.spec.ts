// import { TestBed } from '@angular/core/testing';
// import { EffectsModule } from '@ngrx/effects';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { StoreModule } from '@ngrx/store';
// import { DataPersistence, NxModule } from '@nrwl/nx';
// import { hot } from '@nrwl/nx/testing';
// import { Observable } from 'rxjs';
// import { ConnectToRealtime } from './realtime.actions';
// import { RealtimeEffects } from './realtime.effects';

// describe('RealtimeEffects', () => {
//   let actions: Observable<any>;
//   let effects: RealtimeEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NxModule.forRoot(),
//         StoreModule.forRoot({}),
//         EffectsModule.forRoot([])
//       ],
//       providers: [
//         RealtimeEffects,
//         DataPersistence,
//         provideMockActions(() => actions)
//       ]
//     });

//     effects = TestBed.get(RealtimeEffects);
//   });

//   describe('loadRealtime$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: new ConnectToRealtime() });
//       expect(effects.loadRealtime$).toBeObservable(
//         hot('-a-|', { a: newConnectToRealtimeSuccessd([]) })
//       );
//     });
//   });
// });
