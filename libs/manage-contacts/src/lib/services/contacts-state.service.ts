import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contacts.http';

@Injectable({
  providedIn: 'root'
})
export class ContactsStateService extends EntityCollectionServiceBase<Contact> {
  private internalSelectedContactId$ = new BehaviorSubject<number>(0);

  get selectedContactId$(): Observable<number> {
    return this.internalSelectedContactId$.asObservable();
  }

  get selectedContact$(): Observable<Contact> {
    return combineLatest(this.selectedContactId$, this.entities$).pipe(
      map(([id, contacts]) => contacts.find(c => c.id === id))
    );
  }

  constructor(
    private serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private router: Router,
    private location: Location
  ) {
    super('Contact', serviceElementsFactory);
  }

  goToSelectedContact(id: number, activatedRoute: ActivatedRoute): void {
    this.router.navigate([id], {
      relativeTo: activatedRoute
    });
    this.internalSelectedContactId$.next(id);
    this.getByKey(id);
  }

  goToNewContactForm(activatedRoute: ActivatedRoute): void {
    this.router.navigate(['add'], {
      relativeTo: activatedRoute
    });
    this.internalSelectedContactId$.next(null);
  }

  back(): void {
    this.location.back();
  }
}
