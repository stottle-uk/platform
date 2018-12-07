import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ContactEditComponent } from '../containers/contact-edit.component';
import { ContactsService } from '../services/contacts.service';
import {
  ContactsActionTypes,
  EditContact,
  fromContactsActions,
  GetContactsFailure,
  GetContactsStart,
  GetContactsSuccess,
  GetContactStart,
  GetContactSuccess,
  UpdateContactFailure,
  UpdateContactStart,
  UpdateContactSuccess
} from './contacts.actions';
import { ContactsPartialState } from './contacts.reducer';

@Injectable()
export class ContactsEffects {
  @Effect()
  getContactsStart$ = this.dataPersistence.fetch(
    ContactsActionTypes.GetContactsStart,
    {
      run: (action: GetContactsStart, state: ContactsPartialState) =>
        this.contactsService
          .getContacts(
            action.payload.skip,
            action.payload.take,
            action.payload.sortOrder
          )
          .pipe(
            map(
              contacts =>
                new GetContactsSuccess({
                  contacts
                })
            )
          ),
      onError: (action: GetContactsStart, error) =>
        new GetContactsFailure({ error })
    }
  );

  @Effect({ dispatch: false })
  editContact$: Observable<void> = this.actions$.pipe(
    ofType<EditContact>(fromContactsActions.ContactsActionTypes.EditContact),
    map(action => action.payload.id),
    tap(id => this.router.navigate(['coding-katas', 'manage-contacts', id])),
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

  @Effect()
  getContactStart$ = this.dataPersistence.fetch(
    ContactsActionTypes.GetContactStart,
    {
      run: (action: GetContactStart, state: ContactsPartialState) =>
        this.contactsService.getContact(action.payload.id).pipe(
          map(
            contact =>
              new GetContactSuccess({
                contact
              })
          )
        ),
      onError: (action: GetContactStart, error) =>
        new GetContactsFailure({ error })
    }
  );

  @Effect()
  updateContactStart$ = this.dataPersistence.optimisticUpdate(
    ContactsActionTypes.UpdateContactStart,
    {
      run: (action: UpdateContactStart, state: ContactsPartialState) =>
        this.contactsService.updateContact(action.payload.contact).pipe(
          map(
            contact =>
              new UpdateContactSuccess({
                contact
              })
          )
        ),
      undoAction: (action: UpdateContactStart, error) =>
        new UpdateContactFailure({ error })
    }
  );

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private router: Router,
    private dataPersistence: DataPersistence<ContactsPartialState>
  ) {}
}
