import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from '@nrwl/nx/testing';
import { AuthProviderService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable, of, throwError } from 'rxjs';
import { TestingModule } from '../../testing-helpers/testing.module';
import {
  ChangePasswordFailure,
  ChangePasswordStart,
  ChangePasswordSuccess
} from './change-password.actions';
import { ChangePasswordEffects } from './change-password.effects';

describe('ChangePasswordEffects', () => {
  let actions: Observable<any>;
  let effects: ChangePasswordEffects;
  let authProviderService: AuthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule.forRoot()],
      providers: [provideMockActions(() => actions)]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(ChangePasswordEffects);
    authProviderService = TestBed.get(AuthProviderService);
  });

  describe('loadChangePassword$', () => {
    it('should return ChangePasswordSuccess if successful', () => {
      const response = 'Password Request';
      authProviderService.changePassword = jasmine
        .createSpy('changePassword')
        .and.returnValue(of(response));

      const action = new ChangePasswordStart({
        options: {
          connection: 'connection',
          email: 'email'
        }
      });
      const completion = new ChangePasswordSuccess({
        response: response
      });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.changePasswordStart$).toBeObservable(expected);
    });

    it('should return ChangePasswordSuccess if successful', () => {
      const error = {
        code: '500'
      };
      authProviderService.changePassword = jasmine
        .createSpy('changePassword')
        .and.returnValue(throwError(error));

      const action = new ChangePasswordStart({
        options: {
          connection: 'connection',
          email: 'email'
        }
      });
      const completion = new ChangePasswordFailure({
        error: error
      });

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.changePasswordStart$).toBeObservable(expected);
    });
  });
});
