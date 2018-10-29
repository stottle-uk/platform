import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { CheckSessionEffects } from './check-session.effects';
import { LoadCheckSession, CheckSessionLoaded } from './check-session.actions';

describe('CheckSessionEffects', () => {
  let actions: Observable<any>;
  let effects: CheckSessionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        CheckSessionEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(CheckSessionEffects);
  });

  describe('loadCheckSession$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadCheckSession() });
      expect(effects.loadCheckSession$).toBeObservable(
        hot('-a-|', { a: new CheckSessionLoaded([]) })
      );
    });
  });
});
