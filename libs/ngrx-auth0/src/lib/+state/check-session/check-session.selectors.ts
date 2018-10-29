import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState } from '../+shared/auth.models';
import { selectAuthState } from '../+shared/auth.selectors';
import { CheckSessionState } from './check-session.reducer';

const selectCheckSessionState: MemoizedSelector<
  AuthState,
  CheckSessionState
> = createSelector(selectAuthState, auth => auth.checkSession);

const selectCheckSessionScheduled: MemoizedSelector<
  AuthState,
  boolean
> = createSelector(
  selectCheckSessionState,
  checkSession => checkSession.checkSessionScheduled
);

const selectCheckingSession: MemoizedSelector<
  AuthState,
  boolean
> = createSelector(
  selectCheckSessionState,
  checkSession => checkSession.checkingSession
);

const selectCheckedSession: MemoizedSelector<
  AuthState,
  boolean
> = createSelector(
  selectCheckSessionState,
  checkSession => checkSession.checkedSession
);

const selectCheckgSessionError: MemoizedSelector<
  AuthState,
  auth0.Auth0Error
> = createSelector(selectCheckSessionState, checkSession => checkSession.error);

export const checkSessiondQuery = {
  selectCheckSessionScheduled,
  selectCheckingSession,
  selectCheckedSession,
  selectCheckgSessionError
};
