import { createFeatureSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.reducer';

// Lookup the 'Authentication' feature state managed by NgRx
const getAuthenticationState = createFeatureSelector<AuthenticationState>(
  'authentication'
);
