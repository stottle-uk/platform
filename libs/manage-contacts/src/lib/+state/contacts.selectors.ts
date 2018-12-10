import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Contact } from './contacts.model';
import {
  adapter,
  ContactsState,
  CONTACTS_FEATURE_KEY
} from './contacts.reducer';

const getContactsState = createFeatureSelector<ContactsState>(
  CONTACTS_FEATURE_KEY
);

const getSelectedContactId = createSelector(
  getContactsState,
  (state: ContactsState) => state.selectedContactId
);

const getIsLoaded = createSelector(
  getContactsState,
  (state: ContactsState) => state.loaded
);

const getIsLoading = createSelector(
  getContactsState,
  (state: ContactsState) => state.loading
);

const getError = createSelector(
  getContactsState,
  (state: ContactsState) => state.error
);

const { selectAll: getAllContacts } = adapter.getSelectors(getContactsState);

const getSelectedContact = createSelector(
  getContactsState,
  getSelectedContactId,
  getAllContacts,
  (state: ContactsState, selectedContactId: number, contacts: Contact[]) =>
    state.entities[selectedContactId]
      ? state.entities[selectedContactId]
      : {
          id: Math.max(11, contacts.length + 1),
          name: null,
          street: null,
          email: null,
          phone: null,
          age: null
        }
);

export const contactsQuery = {
  getAllContacts,
  getSelectedContact,
  getIsLoaded,
  getIsLoading,
  getError,
  getSelectedContactId
};
