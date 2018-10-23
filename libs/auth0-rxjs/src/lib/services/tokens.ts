import { InjectionToken } from '@angular/core';

export const AUTH0_WEB_AUTH = new InjectionToken<auth0.WebAuth>('AUTH0_WEB_AUTH');

export const AUTH0_LOGOUT_OPTIONS = new InjectionToken<auth0.LogoutOptions>('AUTH0_LOGOUT_OPTIONS');
