import { TestBed } from '@angular/core/testing';
import { AuthDatesService } from './auth-dates.service';

describe('AuthDatesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthDatesService]
    }));

  it('should return current time', () => {
    const service: AuthDatesService = TestBed.get(AuthDatesService);
    expect(service.getTime()).toBeTruthy();
  });
});
