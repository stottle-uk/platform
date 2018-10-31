import { TestBed } from '@angular/core/testing';
import { AuthDatesService } from './auth-dates.service';

describe('AuthDatesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthDatesService]
    }));

  it('should be created', () => {
    const service: AuthDatesService = TestBed.get(AuthDatesService);
    expect(service).toBeTruthy();
  });
});
