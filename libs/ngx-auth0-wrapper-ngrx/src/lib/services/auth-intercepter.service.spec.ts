import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthIntercepterService } from './auth-intercepter.service';

describe('AuthIntercepterService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [AuthIntercepterService]
    }));

  it('should be created', () => {
    const service: AuthIntercepterService = TestBed.get(AuthIntercepterService);
    expect(service).toBeTruthy();
  });
});
