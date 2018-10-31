import {
  auth0ChangePasswordOptions,
  auth0Error,
  storeState
} from '../../testing-helpers/testing';
import {
  ChangePasswordFailure,
  ChangePasswordStart,
  ChangePasswordSuccess
} from './change-password.actions';
import {
  changePasswordInitialState,
  changePasswordReducer,
  ChangePasswordState
} from './change-password.reducer';

describe('ChangePassword Reducer', () => {
  describe('valid ChangePassword actions ', () => {
    it('should return initial state for ChangePasswordStart', () => {
      const action = new ChangePasswordStart({
        options: auth0ChangePasswordOptions
      });
      const result: ChangePasswordState = changePasswordReducer(
        storeState.changePassword,
        action
      );

      expect(result).toBe(changePasswordInitialState);
    });

    it('should set changePasswordResponse for ChangePasswordSuccess', () => {
      const action = new ChangePasswordSuccess({
        response: storeState.changePassword.changePasswordResponse
      });
      const result: ChangePasswordState = changePasswordReducer(
        changePasswordInitialState,
        action
      );

      expect(result).toEqual(storeState.changePassword);
    });

    it('should set error for ChangePasswordFailure', () => {
      const action = new ChangePasswordFailure({
        error: auth0Error
      });
      const result: ChangePasswordState = changePasswordReducer(
        changePasswordInitialState,
        action
      );

      expect(result).toEqual({
        ...changePasswordInitialState,
        error: auth0Error
      });
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = changePasswordReducer(undefined, action);

      expect(result).toBe(changePasswordInitialState);
    });
  });
});
