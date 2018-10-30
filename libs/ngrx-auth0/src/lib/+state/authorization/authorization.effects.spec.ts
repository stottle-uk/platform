import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { AuthorizationEffects } from './authorization.effects';
import {
  LoadAuthorization,
  AuthorizationLoaded
} from './authorization.actions';

describe('AuthorizationEffects', () => {
  let actions: Observable<any>;
  let effects: AuthorizationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        AuthorizationEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(AuthorizationEffects);
  });

  describe('loadAuthorization$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadAuthorization() });
      expect(effects.loadAuthorization$).toBeObservable(
        hot('-a-|', { a: new AuthorizationLoaded([]) })
      );
    });
  });
});
