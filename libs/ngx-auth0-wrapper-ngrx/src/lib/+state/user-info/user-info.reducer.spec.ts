import { auth0Error, userInfo } from '../../testing-helpers/testing';
import {
  GetUserInfoFailure,
  GetUserInfoStart,
  GetUserInfoSuccess
} from './user-info.actions';
import {
  userInfoInitialState,
  userInfoReducer,
  UserInfoState
} from './user-info.reducer';

describe('UserInfo Reducer', () => {
  describe('valid UserInfo actions ', () => {
    it('should return set loading for GetUserInfoStart', () => {
      const action = new GetUserInfoStart();
      const result: UserInfoState = userInfoReducer(
        userInfoInitialState,
        action
      );

      expect(result).toEqual({
        ...userInfoInitialState,
        error: null,
        loaded: false,
        loading: true
      });
    });

    it('should return set userInfo for GetUserInfoSuccess', () => {
      const action = new GetUserInfoSuccess({
        userInfo: userInfo
      });
      const result: UserInfoState = userInfoReducer(
        userInfoInitialState,
        action
      );

      expect(result).toEqual({
        ...userInfoInitialState,
        userInfo: action.payload.userInfo,
        loaded: true,
        loading: false
      });
    });

    it('should return set error for GetUserInfoFailure', () => {
      const action = new GetUserInfoFailure({
        error: auth0Error
      });
      const result: UserInfoState = userInfoReducer(
        userInfoInitialState,
        action
      );

      expect(result).toEqual({
        ...userInfoInitialState,
        error: action.payload.error,
        loaded: false,
        loading: false
      });
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = userInfoReducer(undefined, action);

      expect(result).toBe(userInfoInitialState);
    });
  });
});
