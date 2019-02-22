import { EntityMetadata } from 'ngrx-data';

export interface IContact {
  id: number;
  name: string;
  street: string;
  email: string;
  phone: string;
  age: number;
}

// tslint:disable-next-line: no-empty-interface
export interface Contact extends IContact {}

export function selectIdFn(contact: Contact) {
  return contact.id;
}

export function sortComparerFn(a: Contact, b: Contact) {
  return a.id > b.id ? 1 : -1;
}

export const contactMetaData: Partial<EntityMetadata<Contact>> = {
  selectId: selectIdFn,
  sortComparer: sortComparerFn
};
