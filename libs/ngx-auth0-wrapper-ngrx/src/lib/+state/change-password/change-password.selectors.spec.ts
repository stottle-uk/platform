import { auth0Error, storeState } from '../../testing-helpers/testing';
import { changePasswordQuery } from './change-password.selectors';

describe('ChangePassword Selectors', () => {
  describe('ChangePassword Selectors', () => {
    it('selectChangePasswordResponse() should return Change Password Response', () => {
      const data = changePasswordQuery.selectChangePasswordResponse.projector(
        storeState.changePassword
      );

      expect(data).toBe(storeState.changePassword.changePasswordResponse);
    });
    it('selectChangePasswordError() should return Change Password Error', () => {
      const data = changePasswordQuery.selectChangePasswordError.projector({
        ...storeState.changePassword,
        error: auth0Error
      });

      expect(data).toBe(auth0Error);
    });
  });
});
