import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthDatesService } from '@stottle-platform/ngx-auth0-wrapper';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [AuthGuardService, AuthDatesService]
    }));

  beforeEach(() => {
    authGuardService = TestBed.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });
});
