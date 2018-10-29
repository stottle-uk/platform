import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { authenticationQuery, AuthState } from '../+state';

@Injectable()
export class AuthIntercepterService {
  constructor(private store: Store<AuthState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store
      .select(authenticationQuery.selectIsAuthenticated(new Date().getTime()))
      .pipe(
        map(
          accessToken =>
            !!accessToken
              ? req.clone({
                  headers: req.headers.set(
                    'Authorization',
                    `Bearer ${accessToken}`
                  )
                })
              : req
        ),
        mergeMap(newReq => next.handle(newReq))
      );
  }
}
