import { TestBed } from '@angular/core/testing';
import * as auth0 from 'auth0-js';
import { AuthDatesService } from './auth-dates.service';
import { AuthProviderService } from './auth-provider.service';
import { AUTH0_LOGOUT_OPTIONS, AUTH0_WEB_AUTH } from './tokens';

const webAuth = new auth0.WebAuth({
  clientID: '',
  domain: ''
});

const mockDates: AuthDatesService = {
  getTime: () => 1000
};

fdescribe('AuthProviderService', () => {
  let service: AuthProviderService;
  let authProvider: auth0.WebAuth;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        AuthProviderService,
        {
          provide: AUTH0_WEB_AUTH,
          useValue: webAuth
        },
        {
          provide: AUTH0_LOGOUT_OPTIONS,
          useValue: {}
        },
        {
          provide: AuthDatesService,
          useValue: mockDates
        }
      ]
    }));

  beforeEach(() => {
    service = TestBed.get(AuthProviderService);
    authProvider = TestBed.get(AUTH0_WEB_AUTH);
  });

  it('should authorize', () => {
    authProvider.authorize = jasmine.createSpy('authorize');

    service.authorize({
      mode: 'signUp'
    });

    expect(authProvider.authorize).toHaveBeenCalledWith({
      mode: 'signUp'
    });
  });

  it('should handle Authentication', () => {
    authProvider.parseHash = jasmine.createSpy('parseHash').and.callFake(callback =>
      callback(null, {
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresIn: '1'
      })
    );

    service.handleAuthentication().subscribe(value => {
      expect(value.accessToken).toBe('accessToken');
      expect(value.idToken).toBe('idToken');
      expect(value.expiresAt).toBe(2000);
    });
  });

  it('should handle Authentication error', () => {
    authProvider.parseHash = jasmine
      .createSpy('parseHash')
      .and.callFake(callback => callback('error', {}));

    service.handleAuthentication().subscribe(
      value => {},
      error => {
        expect(error).toBe('error');
      }
    );
  });

  it('should check session', () => {
    authProvider.checkSession = jasmine.createSpy('parseHash').and.callFake((options, callback) =>
      callback(null, {
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresIn: '1'
      })
    );

    service.checkSession().subscribe(value => {
      expect(value.accessToken).toBe('accessToken');
      expect(value.idToken).toBe('idToken');
      expect(value.expiresAt).toBe(2000);
    });
  });

  it('should change password', () => {
    authProvider.changePassword = jasmine
      .createSpy('parseHash')
      .and.callFake((options, callback) => callback('error', 'password change requested'));

    service
      .changePassword({
        connection: 'db',
        email: 'emai@test.com'
      })
      .subscribe(value => {
        expect(value).toBe('password change requested');
      });
  });

  it('should get user info', () => {
    authProvider.client.userInfo = jasmine
      .createSpy('userInfo')
      .and.callFake((accessToken, callback) =>
        callback('error', {
          name: 'name'
        })
      );

    service.getUserInfo().subscribe(value => {
      expect(value.name).toBe('name');
    });
  });

  it('should schedule Session Check', () => {
    service.scheduleSessionCheck().subscribe(value => {
      expect(value).toBe(0);
    });
  });

  it('should clear local storage', () => {
    service.accessToken = 'accessToken';
    service.idToken = 'idToken';
    service.expiresAt = '200';
    service.clearLocalStorage();
    expect(service.accessToken).toBeNull();
    expect(service.idToken).toBeNull();
    expect(service.expiresAt).toBeNull();
  });

  it('should get session state from local stroage', () => {
    service.expiresAt = '200';
    service.accessToken = 'accessToken';
    service.redirectUrl = 'redirectUrl';
    const result = service.getAuthState();
    expect(result.expiresAt).toBe(200);
    expect(result.accessToken).toBe('accessToken');
    expect(result.redirectUrl).toBe('redirectUrl');
  });
});
