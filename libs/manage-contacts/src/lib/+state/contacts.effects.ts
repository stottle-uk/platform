import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ContactEditComponent } from '../containers/contact-edit.component';
import { ContactsService } from '../services/contacts.service';
import {
  AddContact,
  AddContactCancel,
  AddContactFailure,
  AddContactStart,
  AddContactSuccess,
  fromContactsActions,
  GetContactFailure,
  GetContactsFailure,
  GetContactsStart,
  GetContactsSuccess,
  GetContactStart,
  GetContactSuccess,
  UpdateContact,
  UpdateContactCancel,
  UpdateContactFailure,
  UpdateContactStart,
  UpdateContactSuccess
} from './contacts.actions';
import { ContactsPartialState } from './contacts.reducer';

@Injectable()
export class ContactsEffects {
  @Effect()
  getContactsStart$: Observable<Action> = this.actions$.pipe(
    ofType<GetContactsStart>(
      fromContactsActions.ContactsActionTypes.GetContactsStart
    ),
    map(action => action.payload),
    switchMap(payload =>
      this.contactsService
        .getContacts(payload.skip, payload.take, payload.sortOrder)
        .pipe(
          map(contacts => new GetContactsSuccess({ contacts })),
          catchError(error => of(new GetContactsFailure({ error })))
        )
    )
  );

  @Effect()
  getContactStart$: Observable<Action> = this.actions$.pipe(
    ofType<GetContactStart>(
      fromContactsActions.ContactsActionTypes.GetContactStart
    ),
    map(action => action.payload.id),
    switchMap(id =>
      this.contactsService.getContact(id).pipe(
        map(contact => new GetContactSuccess({ contact })),
        catchError(error => of(new GetContactFailure({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  addContact$: Observable<void> = this.actions$.pipe(
    ofType<AddContact>(fromContactsActions.ContactsActionTypes.AddContact),
    tap(id => this.router.navigate(['coding-katas', 'manage-contacts', 'add'])),
    switchMap(() => EMPTY)
  );

  @Effect()
  addContactStart$: Observable<Action> = this.actions$.pipe(
    ofType<AddContactStart>(
      fromContactsActions.ContactsActionTypes.AddContactStart
    ),
    map(action => action.payload.contact),
    switchMap(contact =>
      this.contactsService.addContact(contact).pipe(
        map(() => new AddContactSuccess({ contact })),
        catchError(error => of(new AddContactFailure({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  updateContact$: Observable<void> = this.actions$.pipe(
    ofType<UpdateContact>(
      fromContactsActions.ContactsActionTypes.UpdateContact
    ),
    map(action => action.payload.id),
    tap(id => this.router.navigate(['coding-katas', 'manage-contacts', id])),
    switchMap(() => EMPTY)
  );

  @Effect()
  updateContactStart$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateContactStart>(
      fromContactsActions.ContactsActionTypes.UpdateContactStart
    ),
    map(action => action.payload.contact),
    switchMap(contact =>
      this.contactsService.updateContact(contact).pipe(
        map(() => new UpdateContactSuccess({ contact })),
        catchError(error => of(new UpdateContactFailure({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  updateContactCancel$: Observable<void> = this.actions$.pipe(
    ofType<
      | AddContactCancel
      | UpdateContactCancel
      | AddContactSuccess
      | UpdateContactSuccess
    >(
      fromContactsActions.ContactsActionTypes.AddContactCancel,
      fromContactsActions.ContactsActionTypes.UpdateContactCancel,
      fromContactsActions.ContactsActionTypes.AddContactSuccess,
      fromContactsActions.ContactsActionTypes.UpdateContactSuccess
    ),
    tap(id => this.location.back()),
    switchMap(() => EMPTY)
  );

  @Effect()
  navigateToContactEditComponent$ = this.dataPersistence.navigation(
    ContactEditComponent,
    {
      run: (route: ActivatedRouteSnapshot, state: ContactsPartialState) =>
        new GetContactStart({
          id: route.params.id
        }),
      onError: (route: ActivatedRouteSnapshot, error) =>
        new GetContactsFailure({ error })
    }
  );

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private router: Router,
    private location: Location,
    private dataPersistence: DataPersistence<ContactsPartialState>
  ) {}
}
