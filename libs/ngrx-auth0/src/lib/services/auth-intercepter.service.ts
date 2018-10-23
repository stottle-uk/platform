import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as fromAuth from '../store';
import { Authentication } from '../store/auth.model';

@Injectable()
export class AuthIntercepterService {
  constructor(private store: Store<fromAuth.State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return combineLatest(
      this.store.select(fromAuth.selectIsAuthenticated(new Date().getTime())),
      this.store.select(fromAuth.selectAuth),
      this.mapAuthenticationDetails
    ).pipe(
      map(
        auth =>
          auth.isAuthenticated && auth.accessToken
            ? req.clone({
                headers: req.headers.set('Authorization', `Bearer ${auth.accessToken}`)
              })
            : req
      ),
      mergeMap(req => next.handle(req))
    );
  }

  private mapAuthenticationDetails(
    isAuthenticated: boolean,
    auth: Authentication
  ): { isAuthenticated: boolean; accessToken: string } {
    return {
      isAuthenticated,
      accessToken: auth.accessToken
    };
  }
}
