import { Inject, Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Observable, of, Subscriber, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Authentication, AuthOptions } from '../models/auth.model';
import { AuthDatesService } from './auth-dates.service';
import { AUTH0_WEB_AUTH, AUTH_OPTIONS } from './tokens';

@Injectable()
export class AuthProviderService {
  ACCESS_TOKEN = `${this.localStoragePrefix}::access_token`;
  ID_TOKEN = `${this.localStoragePrefix}::id_token`;
  EXPIRES_AT = `${this.localStoragePrefix}::expires_at`;
  REDIRECT_URL = `${this.localStoragePrefix}::redirect_url`;

  private get localStoragePrefix(): string {
    return this.authOptions.localStoragePrefix || 'ngx-auth0-wrapper';
  }

  get accessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  set accessToken(accessToken: string) {
    this.addOrRemoveFromLocalStorage(this.ACCESS_TOKEN, accessToken);
  }

  get idToken(): string {
    return localStorage.getItem(this.ID_TOKEN);
  }

  set idToken(idToken: string) {
    this.addOrRemoveFromLocalStorage(this.ID_TOKEN, idToken);
  }

  get expiresAt(): string {
    return localStorage.getItem(this.EXPIRES_AT);
  }

  set expiresAt(expiresAt: string) {
    this.addOrRemoveFromLocalStorage(this.EXPIRES_AT, expiresAt);
  }

  get redirectUrl(): string {
    return localStorage.getItem(this.REDIRECT_URL);
  }

  set redirectUrl(url: string) {
    this.addOrRemoveFromLocalStorage(this.REDIRECT_URL, url);
  }

  constructor(
    private dateService: AuthDatesService,
    @Inject(AUTH0_WEB_AUTH) private webAuth: auth0.WebAuth,
    @Inject(AUTH_OPTIONS) private authOptions: AuthOptions
  ) {}

  authorize(options: auth0.AuthorizeOptions): void {
    this.webAuth.authorize(options);
  }

  logout(options?: auth0.LogoutOptions): void {
    this.webAuth.logout({
      ...this.authOptions.logoutOptions,
      ...options
    });
  }

  handleAuthentication(): Observable<Authentication> {
    return new Observable<auth0.Auth0DecodedHash>(observer =>
      this.webAuth.parseHash(this.callback(observer, this.checkAuthResult))
    ).pipe(this.authorizationHandler());
  }

  checkSession(): Observable<Authentication> {
    return new Observable<auth0.Auth0DecodedHash>(observer =>
      this.webAuth.checkSession(
        {},
        this.callback(observer, this.checkAuthResult)
      )
    ).pipe(this.authorizationHandler());
  }

  changePassword(options: auth0.ChangePasswordOptions): Observable<string> {
    return new Observable<string>(observer =>
      this.webAuth.changePassword(options, this.callback(observer))
    );
  }

  getUserInfo(): Observable<auth0.Auth0UserProfile> {
    return new Observable<auth0.Auth0UserProfile>(observer =>
      this.webAuth.client.userInfo(this.accessToken, this.callback(observer))
    );
  }

  scheduleSessionCheck(): Observable<number> {
    return of(this.expiresAt).pipe(
      switchMap(expiresAt =>
        timer(
          Math.min(
            this.authOptions.sessionRenewalInterval,
            +expiresAt - this.dateService.getTime() - 1000
          )
        )
      )
    );
  }

  clearLocalStorage(): void {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = null;
  }

  getAuthState(): Authentication {
    return {
      expiresAt: JSON.parse(this.expiresAt || '{}'),
      accessToken: this.accessToken,
      redirectUrl: this.redirectUrl
    };
  }

  private callback<T>(
    observer: Subscriber<T>,
    predicate: (result: T) => boolean = result => !!result
  ): auth0.Auth0Callback<T> {
    return (err, result: T) => {
      if (err) {
        observer.error(err);
      }
      if (predicate(result)) {
        observer.next(result);
        observer.complete();
      }
    };
  }

  private checkAuthResult(result: auth0.Auth0DecodedHash): boolean {
    return !!result && !!result.accessToken && !!result.idToken;
  }

  private authorizationHandler(): (
    source: Observable<auth0.Auth0DecodedHash>
  ) => Observable<Authentication> {
    return source =>
      source.pipe(
        map(authResult => this.mapToAuthemticationState(authResult)),
        tap(mappedAuthResult => this.setSession(mappedAuthResult))
      );
  }

  private mapToAuthemticationState(
    authResult: auth0.Auth0DecodedHash
  ): Authentication {
    return {
      ...authResult,
      expiresAt: authResult.expiresIn * 1000 + this.dateService.getTime(),
      redirectUrl: this.redirectUrl
    };
  }

  private setSession(authResult: Authentication): void {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = authResult.expiresAt.toString();
  }

  private addOrRemoveFromLocalStorage(key: string, value: string) {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }
}
