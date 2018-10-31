import { TestBed } from '@angular/core/testing';
import { TestingModule } from '../testing-helpers/testing.module';
import { AuthIntercepterService } from './auth-intercepter.service';

describe('AuthIntercepterService', () => {
  let authIntercepterService: AuthIntercepterService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule.forRoot()]
    }));

  beforeEach(() => {
    authIntercepterService = TestBed.get(AuthIntercepterService);
  });

  it('should be created', () => {
    expect(authIntercepterService).toBeTruthy();
  });
});
