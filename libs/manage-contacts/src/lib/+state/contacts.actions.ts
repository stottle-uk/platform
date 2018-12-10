import { Action } from '@ngrx/store';
import { Contact } from './contacts.model';

export enum ContactsActionTypes {
  GetContactsStart = '[Contacts] Get Contacts Start',
  GetContactsSuccess = '[Contacts] Get Contacts Success',
  GetContactsFailure = '[Contacts] Get Contacts Failure',
  GetContactStart = '[Contacts] Get Contact Start',
  GetContactSuccess = '[Contacts] Get Contact Success',
  GetContactFailure = '[Contacts] Get Contact Failure',
  AddContact = '[Contacts] Add Contact',
  AddContactStart = '[Contacts] Add Contact Start',
  AddContactSuccess = '[Contacts] Add Contact Success',
  AddContactFailure = '[Contacts] Add Contact Failure',
  AddContactCancel = '[Contacts] Add Contact Cancel',
  UpdateContact = '[Contacts] Update Contact',
  UpdateContactStart = '[Contacts] Update Contact Start',
  UpdateContactSuccess = '[Contacts] Update Contact Success',
  UpdateContactFailure = '[Contacts] Update Contact Failure',
  UpdateContactCancel = '[Contacts] Update Contact Cancel'
}

export class GetContactsStart implements Action {
  readonly type = ContactsActionTypes.GetContactsStart;

  constructor(
    public payload: { skip: number; take: number; sortOrder: string }
  ) {}
}

export class GetContactsSuccess implements Action {
  readonly type = ContactsActionTypes.GetContactsSuccess;

  constructor(public payload: { contacts: Contact[] }) {}
}

export class GetContactsFailure implements Action {
  readonly type = ContactsActionTypes.GetContactsFailure;

  constructor(public payload: { error: any }) {}
}

export class GetContactStart implements Action {
  readonly type = ContactsActionTypes.GetContactStart;

  constructor(public payload: { id: number }) {}
}

export class GetContactSuccess implements Action {
  readonly type = ContactsActionTypes.GetContactSuccess;

  constructor(public payload: { contact: Contact }) {}
}

export class GetContactFailure implements Action {
  readonly type = ContactsActionTypes.GetContactFailure;

  constructor(public payload: { error: any }) {}
}

export class AddContact implements Action {
  readonly type = ContactsActionTypes.AddContact;
}

export class AddContactStart implements Action {
  readonly type = ContactsActionTypes.AddContactStart;

  constructor(public payload: { contact: Contact }) {}
}

export class AddContactSuccess implements Action {
  readonly type = ContactsActionTypes.AddContactSuccess;

  constructor(public payload: { contact: Contact }) {}
}

export class AddContactFailure implements Action {
  readonly type = ContactsActionTypes.AddContactFailure;

  constructor(public payload: { error: any }) {}
}

export class AddContactCancel implements Action {
  readonly type = ContactsActionTypes.AddContactCancel;
}

export class UpdateContact implements Action {
  readonly type = ContactsActionTypes.UpdateContact;

  constructor(public payload: { id: number }) {}
}

export class UpdateContactStart implements Action {
  readonly type = ContactsActionTypes.UpdateContactStart;

  constructor(public payload: { contact: Contact }) {}
}

export class UpdateContactSuccess implements Action {
  readonly type = ContactsActionTypes.UpdateContactSuccess;

  constructor(public payload: { contact: Contact }) {}
}

export class UpdateContactFailure implements Action {
  readonly type = ContactsActionTypes.UpdateContactFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateContactCancel implements Action {
  readonly type = ContactsActionTypes.UpdateContactCancel;
}

export type ContactsAction =
  | GetContactsStart
  | GetContactsSuccess
  | GetContactsFailure
  | GetContactStart
  | GetContactSuccess
  | GetContactFailure
  | AddContact
  | AddContactStart
  | AddContactSuccess
  | AddContactFailure
  | AddContactCancel
  | UpdateContact
  | UpdateContactStart
  | UpdateContactSuccess
  | UpdateContactFailure
  | UpdateContactCancel;

export const fromContactsActions = {
  ContactsActionTypes,
  GetContactsStart,
  GetContactsSuccess,
  GetContactsFailure,
  GetContactStart,
  GetContactSuccess,
  GetContactFailure,
  AddContact,
  AddContactStart,
  AddContactSuccess,
  AddContactFailure,
  AddContactCancel,
  UpdateContact,
  UpdateContactStart,
  UpdateContactSuccess,
  UpdateContactFailure,
  UpdateContactCancel
};
