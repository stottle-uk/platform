import { UserInfoLoaded } from './user-info.actions';
import { Entity, userInfoInitialState, userInfoReducer, UserInfoState } from './user-info.reducer';

describe('UserInfo Reducer', () => {
  const getUserInfoId = it => it['id'];
  let createUserInfo;

  beforeEach(() => {
    createUserInfo = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid UserInfo actions ', () => {
    it('should return set the list of known UserInfo', () => {
      const userInfos = [
        createUserInfo('PRODUCT-AAA'),
        createUserInfo('PRODUCT-zzz')
      ];
      const action = new UserInfoLoaded(userInfos);
      const result: UserInfoState = userInfoReducer(userInfoInitialState, action);
      const selId: string = getUserInfoId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = userInfoReducer(userInfoInitialState, action);

      expect(result).toBe(userInfoInitialState);
    });
  });
});
