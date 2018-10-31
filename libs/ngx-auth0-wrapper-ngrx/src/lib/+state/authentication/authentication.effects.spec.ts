import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from '@nrwl/nx/testing';
import {
  AuthDatesService,
  AuthProviderService
} from '@stottle-platform/ngx-auth0-wrapper';
import { Observable } from 'rxjs';
import { authorizationData, validTime } from '../../testing-helpers/testing';
import { TestingModule } from '../../testing-helpers/testing.module';
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
      imports: [TestingModule.forRoot()],
      providers: [provideMockActions(() => actions)]
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
        .and.returnValue(authorizationData);

      const action = new CheckAuthenticationStatus();
      const completion = new UserIsAuthenticated();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.checkAuthenticationStatus$).toBeObservable(expected);
    });

    it('should dispatch UserIsNotAuthenticated', () => {
      authDatesService.getTime = jasmine
        .createSpy('getTime')
        .and.returnValue(validTime);
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
