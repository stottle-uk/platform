export interface Authentication extends auth0.Auth0DecodedHash {
  expiresAt: number;
  redirectUrl: string;
}
