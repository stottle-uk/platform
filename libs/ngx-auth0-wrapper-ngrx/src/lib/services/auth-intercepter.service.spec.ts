import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthDatesService } from '@stottle-platform/ngx-auth0-wrapper';
import { AuthIntercepterService } from './auth-intercepter.service';

describe('AuthIntercepterService', () => {
  let authIntercepterService: AuthIntercepterService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [AuthIntercepterService, AuthDatesService]
    }));

  beforeEach(() => {
    authIntercepterService = TestBed.get(AuthIntercepterService);
  });

  it('should be created', () => {
    expect(authIntercepterService).toBeTruthy();
  });
});
