import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { ContactsService } from '../services/contacts.service';
import {
  ContactsActionTypes,
  GetContactsFailure,
  GetContactsStart,
  GetContactsSuccess
} from './contacts.actions';
import { ContactsPartialState } from './contacts.reducer';

@Injectable()
export class ContactsEffects {
  @Effect()
  loadUsers$ = this.dataPersistence.fetch(
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
        new GetContactsFailure(error)
    }
  );

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private dataPersistence: DataPersistence<ContactsPartialState>
  ) {}
}
