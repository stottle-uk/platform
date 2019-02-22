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
