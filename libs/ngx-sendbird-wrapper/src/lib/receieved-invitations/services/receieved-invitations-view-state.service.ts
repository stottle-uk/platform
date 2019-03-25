import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotifyOnChangesService } from '../../_shared/services/notify-on-changes.service';
import { SendbirdEventHandlersService } from '../../_shared/services/sendbird-event-handlers.service';
import { SendBirdService } from '../../_shared/services/sendbird.service';

@Injectable({
  providedIn: 'root'
})
export class ReceievedInvitationsViewStateService {
  private internalReceivedInvitations$ = new BehaviorSubject<
    SendBird.GroupChannel[]
  >([]);

  get receivedInvitations$(): Observable<SendBird.GroupChannel[]> {
    return this.internalReceivedInvitations$.asObservable();
  }

  constructor(
    private sb: SendBirdService,
    private sbh: SendbirdEventHandlersService,
    private notifier: NotifyOnChangesService
  ) {
    notifier.registerNotifier('receievedInvitations');
  }

  setupHandlers(): Observable<SendBird.GroupChannel> {
    return merge(this.onUserReceivedInvitation());
  }

  onUserReceivedInvitation(): Observable<SendBird.GroupChannel> {
    return this.sbh.userReceivedInvitation$.pipe(
      tap(invitation =>
        this.internalReceivedInvitations$.next([
          ...this.internalReceivedInvitations$.value,
          invitation
        ])
      )
    );
  }
}
