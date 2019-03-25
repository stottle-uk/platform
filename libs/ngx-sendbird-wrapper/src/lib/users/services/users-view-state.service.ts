import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { NotifyOnChangesService } from '../../_shared/services/notify-on-changes.service';
import { SendBirdService } from '../../_shared/services/sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class UsersViewStateService {
  private internalApplicationUserListQuery$ = new BehaviorSubject<
    SendBird.ApplicationUserListQuery
  >(null);
  private internalApplicationUsers$ = new BehaviorSubject<SendBird.User[]>([]);

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
    private notifier: NotifyOnChangesService
  ) {
    notifier.registerNotifier('users');
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
