import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionDataService, QueryParams, Update } from 'ngrx-data';
import { Observable } from 'rxjs';
import { Contact, IContact } from '../models/contacts.http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService implements EntityCollectionDataService<Contact> {
  name: string;

  constructor(private httpClient: HttpClient) {
    this.name = 'Contacts Data Service';
  }

  add(contact: Contact): Observable<Contact> {
    return this.httpClient.post<IContact>(`api/contacts`, contact);
  }

  delete(id: string | number): Observable<string | number> {
    throw new Error('Method not implemented.');
  }

  getAll(): Observable<Contact[]> {
    return this.httpClient.get<IContact[]>('api/contacts');
  }

  getById(id: number): Observable<Contact> {
    return this.httpClient.get<IContact>(`api/contacts/${id}`);
  }

  getWithQuery(params: string | QueryParams): Observable<Contact[]> {
    return this.httpClient.get<IContact[]>('api/contacts');
  }

  update(contact: Update<Contact>): Observable<Contact> {
    return this.httpClient.put<IContact>(`api/contacts/${contact.id}`, contact);
  }

  upsert(entity: Contact): Observable<Contact> {
    throw new Error('Method not implemented.');
  }
}
