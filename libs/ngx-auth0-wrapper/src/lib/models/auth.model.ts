export interface Authentication extends auth0.Auth0DecodedHash {
  expiresAt: number;
  redirectUrl: string;
}

export interface AuthOptions {
  options: auth0.AuthOptions;
  logoutOptions: auth0.LogoutOptions;
  sessionRenewalInterval: number;
  localStoragePrefix?: string;
}
