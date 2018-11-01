import { InjectionToken } from '@angular/core';
import { AuthOptions } from '../models/auth.model';

export const AUTH0_WEB_AUTH = new InjectionToken<auth0.WebAuth>(
  'AUTH0_WEB_AUTH'
);

export const AUTH0_WEB_AUTH_OPTIONS = new InjectionToken<auth0.AuthOptions>(
  'AUTH0_WEB_AUTH_OPTIONS'
);

export const AUTH_OPTIONS = new InjectionToken<AuthOptions>('AUTH_OPTIONS');
