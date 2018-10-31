import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence, NxModule } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';
import { AUTH0_WEB_AUTH, AuthDatesService, AuthProviderService, AUTH_OPTIONS } from '@stottle-platform/ngx-auth0-wrapper';
import { WebAuth } from 'auth0-js';
import { Observable } from 'rxjs';
import { Authorize } from './authorization.actions';
import { AuthorizationEffects } from './authorization.effects';

fdescribe('AuthorizationEffects', () => {
  let actions: Observable<any>;
  let effects: AuthorizationEffects;
  let authProviderService: AuthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        AuthProviderService,
        AuthDatesService,
        {
          provide: AUTH0_WEB_AUTH,
          useValue: new WebAuth({
            clientID: '',
            domain: ''
          })
        },
        {
          provide: AUTH_OPTIONS,
          useValue: {}
        },
        AuthorizationEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(AuthorizationEffects);
    authProviderService = TestBed.get(AuthProviderService);
  });

  describe('loadAuthorization$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: new Authorize({
          options: {},
          redirectUrl: ''
        })
      });

      console.log(effects.authorize$);

      expect(effects.authorize$).toBeObservable(new Observable());
    });
  });
});
