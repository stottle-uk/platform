import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  AUTH0_LOGOUT_OPTIONS,
  AUTH0_WEB_AUTH,
  AuthDatesService,
  AuthProviderService
} from '@stottle-platform/auth0-rxjs';
import * as auth0 from 'auth0-js';
import { Observable } from 'rxjs';
import { AuthEffects } from './auth.effects';

const webAuth = new auth0.WebAuth({
  clientID: '',
  domain: ''
});

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        AuthProviderService,
        AuthDatesService,
        {
          provide: AUTH0_WEB_AUTH,
          useValue: webAuth
        },
        {
          provide: AUTH0_LOGOUT_OPTIONS,
          useValue: {}
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
