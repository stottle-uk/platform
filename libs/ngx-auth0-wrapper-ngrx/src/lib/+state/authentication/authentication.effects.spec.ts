import { TestBed } from '@angular/core/testing';
import { Actions, EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence, NxModule } from '@nrwl/nx';
import { cold, hot } from '@nrwl/nx/testing';
import {
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthProviderService,
  AUTH_OPTIONS
} from '@stottle-platform/ngx-auth0-wrapper';
import { WebAuth } from 'auth0-js';
import { Observable } from 'rxjs';
import { ClearAuthenticationDetails } from '../authorization';
import { CheckSessionStart } from '../check-session';
import {
  CheckAuthenticationStatus,
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from './authentication.actions';
import { AuthenticationEffects } from './authentication.effects';

describe('AuthenticationEffects', () => {
  let actions: Observable<any>;
  let effects: AuthenticationEffects;
  let authProviderService: AuthProviderService;
  let authDatesService: AuthDatesService;

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
        AuthenticationEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(AuthenticationEffects);
    authProviderService = TestBed.get(AuthProviderService);
    authDatesService = TestBed.get(AuthDatesService);
  });

  describe('checkAuthenticationStatus$', () => {
    it('should dispatch UserIsAuthenticated', () => {
      authDatesService.getTime = jasmine
        .createSpy('getTime')
        .and.returnValue(1);
      authProviderService.getAuthState = jasmine
        .createSpy('getAuthState')
        .and.returnValue({
          expiresAt: 2,
          accessToken: 'accessToken'
        });

      const action = new CheckAuthenticationStatus();
      const completion = new UserIsAuthenticated();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.checkAuthenticationStatus$).toBeObservable(expected);
    });

    it('should dispatch UserIsNotAuthenticated', () => {
      authDatesService.getTime = jasmine
        .createSpy('getTime')
        .and.returnValue(1);
      authProviderService.getAuthState = jasmine.createSpy('getAuthState');

      const action = new CheckAuthenticationStatus();
      const completion = new UserIsNotAuthenticated();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.checkAuthenticationStatus$).toBeObservable(expected);
    });
  });

  describe('userIsAuthenticatedScheduleSessionCheck$', () => {
    it('should work', () => {
      const action = new UserIsAuthenticated();
      const completion = new CheckSessionStart();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.userIsAuthenticatedScheduleSessionCheck$).toBeObservable(
        expected
      );
    });
  });

  describe('clearLocalStorage$', () => {
    it('should work', () => {
      const action = new UserIsNotAuthenticated();
      const completion = new ClearAuthenticationDetails();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.clearLocalStorage$).toBeObservable(expected);
    });
  });
});
