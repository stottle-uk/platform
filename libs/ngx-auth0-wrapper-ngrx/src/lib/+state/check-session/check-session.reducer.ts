import {
  CheckSessionAction,
  CheckSessionActionTypes
} from './check-session.actions';

export interface CheckSessionState {
  checkSessionScheduled: boolean;
  checkingSession: boolean;
  checkedSession: boolean;
  error: auth0.Auth0Error;
}

export const checkSessionInitialState: CheckSessionState = {
  checkSessionScheduled: false,
  checkingSession: false,
  checkedSession: false,
  error: null
};

export function checkSessionReducer(
  state: CheckSessionState = checkSessionInitialState,
  action: CheckSessionAction
): CheckSessionState {
  switch (action.type) {
    case CheckSessionActionTypes.ScheduleSessionCheck: {
      return {
        ...state,
        checkSessionScheduled: true
      };
    }

    case CheckSessionActionTypes.CheckSessionStart: {
      return {
        ...state,
        error: null,
        checkingSession: true,
        checkedSession: false,
        checkSessionScheduled: false
      };
    }

    case CheckSessionActionTypes.CheckSessionSuccess: {
      return {
        ...state,
        checkingSession: false,
        checkedSession: true
      };
    }

    case CheckSessionActionTypes.CheckSessionFailure: {
      return {
        ...state,
        error: action.payload.error,
        checkingSession: false,
        checkedSession: false
      };
    }

    default:
      return state;
  }
}
