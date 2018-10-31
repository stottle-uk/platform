import { storeState } from '../../testing-helpers/testing';
import { userInfoQuery } from './user-info.selectors';

describe('UserInfo Selectors', () => {
  describe('UserInfo Selectors', () => {
    it('selectUserInfo() should return User Info', () => {
      const data = userInfoQuery.selectUserInfo.projector(storeState.userInfo);

      expect(data).toBe(storeState.userInfo.userInfo);
    });

    it('selectUserInfoError() should return Error', () => {
      const data = userInfoQuery.selectUserInfoError.projector(
        storeState.userInfo
      );

      expect(data).toBe(storeState.userInfo.error);
    });

    it('selectUserInfoIsLoading() should return Loading', () => {
      const data = userInfoQuery.selectUserInfoIsLoading.projector(
        storeState.userInfo
      );

      expect(data).toBe(storeState.userInfo.loading);
    });

    it('selectUserInfoIsLoading() should return Loaded', () => {
      const data = userInfoQuery.selectUserInfoIsLoaded.projector(
        storeState.userInfo
      );

      expect(data).toBe(storeState.userInfo.loaded);
    });
  });
});
