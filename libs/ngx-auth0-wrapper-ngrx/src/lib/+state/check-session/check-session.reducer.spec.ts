import {
  auth0Error,
  authorizationData,
  storeState
} from '../../testing-helpers/testing';
import {
  CheckSessionFailure,
  CheckSessionStart,
  CheckSessionSuccess,
  ScheduleSessionCheck
} from './check-session.actions';
import {
  checkSessionInitialState,
  checkSessionReducer,
  CheckSessionState
} from './check-session.reducer';

describe('CheckSession Reducer', () => {
  describe('valid CheckSession actions ', () => {
    it('should return initial state for ScheduleSessionCheck', () => {
      const action = new ScheduleSessionCheck();
      const result: CheckSessionState = checkSessionReducer(
        storeState.checkSession,
        action
      );

      expect(result).toEqual({
        ...checkSessionInitialState,
        checkSessionScheduled: true
      });
    });

    it('should return initial state for CheckSessionStart', () => {
      const action = new CheckSessionStart();
      const result: CheckSessionState = checkSessionReducer(
        storeState.checkSession,
        action
      );

      expect(result).toEqual({
        ...checkSessionInitialState,
        error: null,
        checkingSession: true,
        checkedSession: false,
        checkSessionScheduled: false
      });
    });

    it('should return initial state for CheckSessionSuccess', () => {
      const action = new CheckSessionSuccess({ auth: authorizationData });
      const result: CheckSessionState = checkSessionReducer(
        storeState.checkSession,
        action
      );

      expect(result).toEqual({
        ...checkSessionInitialState,
        checkingSession: false,
        checkedSession: true
      });
    });

    it('should return initial state for CheckSessionFailure', () => {
      const action = new CheckSessionFailure({ error: auth0Error });
      const result: CheckSessionState = checkSessionReducer(
        storeState.checkSession,
        action
      );

      expect(result).toEqual({
        ...checkSessionInitialState,
        error: action.payload.error,
        checkingSession: false,
        checkedSession: false
      });
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = checkSessionReducer(undefined, action);

      expect(result).toBe(checkSessionInitialState);
    });
  });
});
