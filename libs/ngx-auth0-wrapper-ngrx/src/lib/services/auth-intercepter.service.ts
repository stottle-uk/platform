import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthDatesService } from '@stottle-platform/ngx-auth0-wrapper';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { authorizationQuery, AuthState } from '../+state';

@Injectable()
export class AuthIntercepterService {
  constructor(
    private store: Store<AuthState>,
    private date: AuthDatesService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(authorizationQuery.selectIsAuthenticated(this.date.getTime())),
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
