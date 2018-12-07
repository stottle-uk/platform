import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../models/contacts.http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private httpClient: HttpClient) {}

  getContacts(
    skip: number,
    take: number,
    sortOrder: string
  ): Observable<IContact[]> {
    return this.httpClient.get<IContact[]>('api/contacts');
  }

  getContact(id: number): Observable<IContact> {
    return this.httpClient.get<IContact>(`api/contacts/${id}`);
  }

  updateContact(contact: IContact): Observable<IContact> {
    return this.httpClient.put<IContact>(`api/contacts/${contact.id}`, contact);
  }
}
