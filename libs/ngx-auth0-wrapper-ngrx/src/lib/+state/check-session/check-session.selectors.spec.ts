import { storeState } from '../../testing-helpers/testing';
import { checkSessiondQuery } from './check-session.selectors';

describe('CheckSession Selectors', () => {
  describe('CheckSession Selectors', () => {
    it('selectChangePasswordResponse() should return Check Session Scheduled', () => {
      const data = checkSessiondQuery.selectCheckSessionScheduled.projector(
        storeState.checkSession
      );

      expect(data).toBe(storeState.checkSession.checkSessionScheduled);
    });

    it('selectChangePasswordResponse() should return Checking Session', () => {
      const data = checkSessiondQuery.selectCheckingSession.projector(
        storeState.checkSession
      );

      expect(data).toBe(storeState.checkSession.checkingSession);
    });

    it('selectChangePasswordResponse() should return Checked Session', () => {
      const data = checkSessiondQuery.selectCheckedSession.projector(
        storeState.checkSession
      );

      expect(data).toBe(storeState.checkSession.checkedSession);
    });

    it('selectChangePasswordResponse() should return Check Session Error', () => {
      const data = checkSessiondQuery.selectCheckSessionError.projector(
        storeState.checkSession
      );

      expect(data).toBe(storeState.checkSession.error);
    });
  });
});
