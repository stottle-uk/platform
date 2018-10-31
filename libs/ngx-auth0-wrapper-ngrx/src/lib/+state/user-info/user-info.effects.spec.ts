import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from '@nrwl/nx/testing';
import { AuthProviderService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable, of, throwError } from 'rxjs';
import {
  auth0Error,
  authorizationData,
  userInfo
} from '../../testing-helpers/testing';
import { TestingModule } from '../../testing-helpers/testing.module';
import { AuthenticationSuccess } from '../authorization';
import {
  GetUserInfoFailure,
  GetUserInfoStart,
  GetUserInfoSuccess
} from './user-info.actions';
import { UserInfoEffects } from './user-info.effects';

describe('UserInfoEffects', () => {
  let actions: Observable<any>;
  let effects: UserInfoEffects;
  let authProviderService: AuthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule.forRoot()],
      providers: [provideMockActions(() => actions)]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(UserInfoEffects);
    authProviderService = TestBed.get(AuthProviderService);
  });

  describe('authenticationSuccessGetUserInfoStart$', () => {
    it('should work', () => {
      const action = new AuthenticationSuccess({ auth: authorizationData });
      const completion = new GetUserInfoStart();

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.authenticationSuccessGetUserInfoStart$).toBeObservable(
        expected
      );
    });
  });

  describe('getUserInfoStart$', () => {
    it('should work', () => {
      authProviderService.getUserInfo = jasmine
        .createSpy('getUserInfo')
        .and.returnValue(of(userInfo));

      const action = new GetUserInfoStart();
      const completion = new GetUserInfoSuccess({
        userInfo: userInfo
      });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getUserInfoStart$).toBeObservable(expected);
    });

    it('should handle error', () => {
      authProviderService.getUserInfo = jasmine
        .createSpy('getUserInfo')
        .and.returnValue(throwError(auth0Error));

      const action = new GetUserInfoStart();
      const completion = new GetUserInfoFailure({
        error: auth0Error
      });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getUserInfoStart$).toBeObservable(expected);
    });
  });
});
