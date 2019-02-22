import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { SendbirdEventHandlersService } from './sendbird-event-handlers.service';
import { SendBirdService } from './sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class SendbirdViewStateService {
  private internalIsConnected$ = new BehaviorSubject<boolean>(false);
  private internalCurrentUser$ = new BehaviorSubject<SendBird.User>(null);

  private internalApplicationUserListQuery$ = new BehaviorSubject<
    SendBird.ApplicationUserListQuery
  >(null);
  private internalApplicationUsers$ = new BehaviorSubject<SendBird.User[]>([]);

  get isConnected$(): Observable<boolean> {
    return this.internalIsConnected$.asObservable();
  }

  get currentUser$(): Observable<SendBird.User> {
    return this.internalCurrentUser$
      .asObservable()
      .pipe(filter(user => !!user));
  }

  get applicationUserListQuery$(): Observable<
    SendBird.ApplicationUserListQuery
  > {
    return this.internalApplicationUserListQuery$
      .asObservable()
      .pipe(filter(query => !!query));
  }

  get applicationUsers$(): Observable<SendBird.User[]> {
    return this.internalApplicationUsers$
      .asObservable()
      .pipe(filter(queries => !!queries));
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService
  ) {}

  connect(userId: string): Observable<SendBird.User> {
    return this.sb.connect(userId).pipe(
      tap(user => this.internalCurrentUser$.next(user)),
      tap(() => this.internalIsConnected$.next(true)),
      tap(() => this.sbh.setupHandlers())
    );
  }

  disconnect(): Observable<Object> {
    return this.sb.disconnect().pipe(
      tap(() => this.internalCurrentUser$.next(null)),
      tap(() => this.internalIsConnected$.next(false)),
      tap(() => this.sbh.removeHandlers())
    );
  }

  getUsers(): Observable<SendBird.User[]> {
    const query = this.sb.instance.createApplicationUserListQuery();
    return of(query).pipe(
      tap(query => (query.limit = 5)),
      switchMap(query =>
        this.sb.getApplicationUsers(query).pipe(
          tap(() => this.internalApplicationUserListQuery$.next(query)),
          tap(users => this.internalApplicationUsers$.next(users))
        )
      )
    );
  }

  getMoreUsers(): Observable<SendBird.User[]> {
    return this.applicationUserListQuery$.pipe(
      take(1),
      filter(query => query.hasNext && !query.isLoading),
      switchMap(query =>
        this.sb
          .getApplicationUsers(query)
          .pipe(
            tap(users =>
              this.internalApplicationUsers$.next([
                ...this.internalApplicationUsers$.value,
                ...users
              ])
            )
          )
      )
    );
  }
}
