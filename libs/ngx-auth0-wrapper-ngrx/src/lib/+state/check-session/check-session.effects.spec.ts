import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from '@nrwl/nx/testing';
import { AuthProviderService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable, of, throwError } from 'rxjs';
import { auth0Error, authorizationData } from '../../testing-helpers/testing';
import { TestingModule } from '../../testing-helpers/testing.module';
import { AuthenticationError, AuthenticationSuccess } from '../authorization';
import {
  CheckSessionFailure,
  CheckSessionStart,
  CheckSessionSuccess,
  ScheduleSessionCheck
} from './check-session.actions';
import { CheckSessionEffects } from './check-session.effects';

describe('CheckSessionEffects', () => {
  let actions: Observable<any>;
  let effects: CheckSessionEffects;
  let authProviderService: AuthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule.forRoot()],
      providers: [provideMockActions(() => actions)]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(CheckSessionEffects);
    authProviderService = TestBed.get(AuthProviderService);
  });

  describe('authenticationSuccessScheduleSessionCheck$', () => {
    it('should work', () => {
      const action = new AuthenticationSuccess({ auth: authorizationData });
      const completion = new ScheduleSessionCheck();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.authenticationSuccessScheduleSessionCheck$).toBeObservable(
        expected
      );
    });
  });

  describe('scheduleSessionCheck$', () => {
    it('should work', () => {
      authProviderService.scheduleSessionCheck = jasmine
        .createSpy('scheduleSessionCheck')
        .and.returnValue(of(1));

      const action = new ScheduleSessionCheck();
      const completion = new CheckSessionStart();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.scheduleSessionCheck$).toBeObservable(expected);
    });
  });

  describe('checkSessionStart$', () => {
    it('should work', () => {
      authProviderService.checkSession = jasmine
        .createSpy('checkSession')
        .and.returnValue(of(authorizationData));

      const action = new CheckSessionStart();
      const completion = new CheckSessionSuccess({ auth: authorizationData });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.checkSessionStart$).toBeObservable(expected);
    });

    it('should handle error', () => {
      authProviderService.checkSession = jasmine
        .createSpy('checkSession')
        .and.returnValue(throwError(auth0Error));

      const action = new CheckSessionStart();
      const completion = new CheckSessionFailure({ error: auth0Error });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.checkSessionStart$).toBeObservable(expected);
    });
  });

  describe('checkSessionSuccess$', () => {
    it('should work', () => {
      const action = new CheckSessionSuccess({ auth: authorizationData });
      const completion = new AuthenticationSuccess({ auth: authorizationData });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.checkSessionSuccess$).toBeObservable(expected);
    });
  });

  describe('checkSessionFailure$', () => {
    it('should work', () => {
      const action = new CheckSessionFailure({ error: auth0Error });
      const completion = new AuthenticationError({ error: auth0Error });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.checkSessionFailure$).toBeObservable(expected);
    });
  });
});
