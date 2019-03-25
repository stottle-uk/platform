import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dictionary } from '../models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class NotifyOnChangesService {
  private internalNotifyOnChanges$ = new BehaviorSubject<Dictionary<boolean>>(
    {}
  );

  get notfifyOnChanges$(): Observable<Dictionary<boolean>> {
    return this.internalNotifyOnChanges$.asObservable();
  }

  registerNotifier(name: string): void {
    this.setNotifier(name, false);
  }

  disbableNotifier(name: string): void {
    this.setNotifier(name, false);
  }

  markAllForNotify(): void {
    this.internalNotifyOnChanges$.next(
      Object.keys(this.internalNotifyOnChanges$.value).reduce(
        (changes, key) => ({
          ...changes,
          [key]: true
        }),
        {}
      )
    );
  }

  private setNotifier(name: string, notify: boolean) {
    this.internalNotifyOnChanges$.next({
      ...this.internalNotifyOnChanges$.value,
      [name]: notify
    });
  }
}
