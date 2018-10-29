import { InjectionToken } from '@angular/core';
import { AuthOptions } from '../models/auth.model';

export const AUTH0_WEB_AUTH = new InjectionToken<auth0.WebAuth>(
  'AUTH0_WEB_AUTH'
);

export const AUTH_OPTIONS = new InjectionToken<AuthOptions>('AUTH_OPTIONS');
