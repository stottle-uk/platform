import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ContactsAction, ContactsActionTypes } from './contacts.actions';
import { Contact } from './contacts.model';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState extends EntityState<Contact> {
  selectedContactId: number;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export interface ContactsPartialState {
  readonly [CONTACTS_FEATURE_KEY]: ContactsState;
}

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>({
  selectId: contact => contact.id,
  sortComparer: (a, b) => (a.id > b.id ? 1 : -1)
});

export const initialState: ContactsState = adapter.getInitialState({
  selectedContactId: null,
  loading: false,
  loaded: false,
  error: null
});

export function contactsReducer(
  state: ContactsState = initialState,
  action: ContactsAction
): ContactsState {
  switch (action.type) {
    case ContactsActionTypes.GetContactsStart: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }

    case ContactsActionTypes.GetContactsSuccess: {
      return adapter.upsertMany(action.payload.contacts, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    case ContactsActionTypes.GetContactStart: {
      return {
        ...state,
        selectedContactId: action.payload.id,
        loaded: false,
        loading: true
      };
    }

    case ContactsActionTypes.GetContactSuccess: {
      return adapter.upsertOne(action.payload.contact, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    case ContactsActionTypes.GetContactFailure:
    case ContactsActionTypes.GetContactsFailure: {
      return {
        ...state
      };
    }

    case ContactsActionTypes.AddContactStart:
    case ContactsActionTypes.UpdateContactStart: {
      return adapter.upsertOne(action.payload.contact, {
        ...state,
        loaded: false,
        loading: true
      });
    }

    case ContactsActionTypes.AddContactSuccess:
    case ContactsActionTypes.UpdateContactSuccess: {
      return {
        ...state,
        loaded: true,
        loading: false
      };
    }

    default:
      return state;
  }
}
