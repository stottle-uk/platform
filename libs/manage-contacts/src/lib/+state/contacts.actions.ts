import { Action } from '@ngrx/store';
import { Contact } from './contacts.model';

export enum ContactsActionTypes {
  GetContactsStart = '[Contacts] Get Contacts Start',
  GetContactsSuccess = '[Contacts] Get Contacts Success',
  GetContactsFailure = '[Contacts] Get Contacts Failure',
  GetContactStart = '[Contacts] Get Contact Start',
  GetContactSuccess = '[Contacts] Get Contact Success',
  GetContactFailure = '[Contacts] Get Contact Failure',
  EditContact = '[Contacts] Edit Contact',
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

export class EditContact implements Action {
  readonly type = ContactsActionTypes.EditContact;

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
  | EditContact
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
  EditContact,
  UpdateContactStart,
  UpdateContactSuccess,
  UpdateContactFailure,
  UpdateContactCancel
};
