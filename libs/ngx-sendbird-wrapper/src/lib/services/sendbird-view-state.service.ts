import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SendBird from 'sendbird';

@Injectable({
  providedIn: 'root'
})
export class SendbirdViewStateService {
  private interalCurrentChannel$ = new BehaviorSubject<SendBird.OpenChannel>(
    null
  );

  get currentChannel$(): Observable<SendBird.OpenChannel> {
    return this.interalCurrentChannel$.asObservable();
  }

  constructor() {}

  setCurrentChannel(channel: SendBird.OpenChannel): void {
    this.interalCurrentChannel$.next(channel);
  }
}
