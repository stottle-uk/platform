import { TestBed } from '@angular/core/testing';
import { Actions, EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence, NxModule } from '@nrwl/nx';
import { cold, hot } from '@nrwl/nx/testing';
import {
  AUTH0_WEB_AUTH,
  AuthDatesService,
  Authentication,
  AuthProviderService,
  AUTH_OPTIONS
} from '@stottle-platform/ngx-auth0-wrapper';
import { Auth0Error, WebAuth } from 'auth0-js';
import { Observable, of, throwError } from 'rxjs';
import {
  AuthenticationComplete,
  AuthenticationError,
  AuthenticationSuccess,
  Authorize,
  ClearAuthenticationDetails,
  Logout
} from './authorization.actions';
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

    actions = TestBed.get(Actions);
    effects = TestBed.get(AuthorizationEffects);
    authProviderService = TestBed.get(AuthProviderService);
  });

  describe('authorize$', () => {
    it('should work', () => {
      const options = {
        options: {
          scope: 'login'
        },
        redirectUrl: ''
      };
      authProviderService.authorize = jasmine.createSpy('authorize');

      const action = new Authorize(options);

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: undefined });

      expect(effects.authorize$).toBeObservable(expected);
      expect(authProviderService.authorize).toHaveBeenCalledWith(
        options.options
      );
    });
  });

  describe('authorizeSaveRedirectUrl$', () => {
    it('should work', () => {
      const options = {
        options: {
          scope: 'login'
        },
        redirectUrl: 'redirectUrl'
      };

      const action = new Authorize(options);

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: options.redirectUrl });

      expect(effects.authorizeSaveRedirectUrl$).toBeObservable(expected);
      expect(authProviderService.redirectUrl).toBe(options.redirectUrl);
    });
  });

  describe('authenticationComplete$', () => {
    it('should work', () => {
      const auth: Authentication = {
        expiresAt: 1,
        redirectUrl: 'redirectUrl'
      };

      authProviderService.handleAuthentication = jasmine
        .createSpy('handleAuthentication')
        .and.returnValue(of(auth));

      const action = new AuthenticationComplete();
      const completion = new AuthenticationSuccess({ auth });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.authenticationComplete$).toBeObservable(expected);
      expect(authProviderService.handleAuthentication).toHaveBeenCalled();
    });

    it('should handle error', () => {
      const error: Auth0Error = {
        code: '500'
      };

      authProviderService.handleAuthentication = jasmine
        .createSpy('handleAuthentication')
        .and.returnValue(throwError(error));

      const action = new AuthenticationComplete();
      const completion = new AuthenticationError({ error });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.authenticationComplete$).toBeObservable(expected);
      expect(authProviderService.handleAuthentication).toHaveBeenCalled();
    });
  });

  describe('authenticationSuccessDeleteRedirectUrl$', () => {
    it('should work', () => {
      const auth: Authentication = {
        expiresAt: 1,
        redirectUrl: 'redirectUrl'
      };
      authProviderService.redirectUrl = 'redirectUrl';

      const action = new AuthenticationSuccess({ auth });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: action });

      expect(effects.authenticationSuccessDeleteRedirectUrl$).toBeObservable(
        expected
      );
      expect(authProviderService.redirectUrl).toBeNull();
    });
  });

  describe('logout$', () => {
    it('should work', () => {
      authProviderService.logout = jasmine.createSpy('logout');
      const action = new Logout();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: undefined });

      expect(effects.logout$).toBeObservable(expected);
      expect(authProviderService.logout).toHaveBeenCalled();
    });
  });

  describe('logoutClearLocalStorage$', () => {
    it('should work', () => {
      const action = new Logout();
      const completion = new ClearAuthenticationDetails();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.logoutClearLocalStorage$).toBeObservable(expected);
    });
  });

  describe('clearLocalStorage$', () => {
    it('should work', () => {
      authProviderService.clearLocalStorage = jasmine.createSpy(
        'clearLocalStorage'
      );
      const action = new ClearAuthenticationDetails();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: undefined });

      expect(effects.clearLocalStorage$).toBeObservable(expected);
      expect(authProviderService.clearLocalStorage).toHaveBeenCalled();
    });
  });
});
