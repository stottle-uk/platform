import { TestBed } from '@angular/core/testing';
import { AuthDatesService } from '@stottle-platform/ngx-auth0-wrapper';
import { TestingModule } from '../testing-helpers/testing.module';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule.forRoot()],
      providers: [AuthGuardService, AuthDatesService]
    }));

  beforeEach(() => {
    authGuardService = TestBed.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });
});
