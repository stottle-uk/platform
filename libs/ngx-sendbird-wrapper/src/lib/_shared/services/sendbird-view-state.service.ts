import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { SendbirdEventHandlersService } from './sendbird-event-handlers.service';
import { SendBirdService } from './sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class SendbirdViewStateService {
  private internalIsConnected$ = new BehaviorSubject<boolean>(false);
  private internalCurrentUser$ = new BehaviorSubject<SendBird.User>(null);

  get isConnected$(): Observable<boolean> {
    return this.internalIsConnected$.asObservable();
  }

  get currentUser$(): Observable<SendBird.User> {
    return this.internalCurrentUser$
      .asObservable()
      .pipe(filter(user => !!user));
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
}
