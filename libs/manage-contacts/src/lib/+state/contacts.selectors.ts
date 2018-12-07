import { createFeatureSelector, createSelector } from '@ngrx/store';
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

const { selectAll: selectAllContacts } = adapter.getSelectors(getContactsState);

export const contactsQuery = {
  selectAllContacts,
  getSelectedContactId,
  getIsLoaded,
  getIsLoading,
  getError
};
