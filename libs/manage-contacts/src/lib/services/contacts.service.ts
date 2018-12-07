import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private httpClient: HttpClient) {}

  getContacts(skip: number, take: number, sortOrder: string): Observable<any> {
    return this.httpClient.get('api/contacts');
  }

  getContact(id: string): Observable<any> {
    return this.httpClient.get(`api/contacts/${id}`);
  }
}
