import { createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { CheckSessionState } from './check-session.reducer';

const selectCheckSessionState: MemoizedSelector<
  State,
  CheckSessionState
> = createSelector(selectAuthState, auth => auth.checkSession);

const selectCheckSessionScheduled: MemoizedSelector<
  State,
  boolean
> = createSelector(
  selectCheckSessionState,
  checkSession => checkSession.checkSessionScheduled
);

const selectCheckingSession: MemoizedSelector<State, boolean> = createSelector(
  selectCheckSessionState,
  checkSession => checkSession.checkingSession
);

const selectCheckedSession: MemoizedSelector<State, boolean> = createSelector(
  selectCheckSessionState,
  checkSession => checkSession.checkedSession
);

const selectCheckgSessionError: MemoizedSelector<
  State,
  auth0.Auth0Error
> = createSelector(selectCheckSessionState, checkSession => checkSession.error);

export const checkSessiondQuery = {
  selectCheckSessionScheduled,
  selectCheckingSession,
  selectCheckedSession,
  selectCheckgSessionError
};
