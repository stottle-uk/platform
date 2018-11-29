import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employment } from '../+state/employment/employment.model';

@Injectable()
export class EmploymentService {
  constructor(private httpClient: HttpClient) {}

  getEmploymentHistory(): Observable<Employment[]> {
    return this.httpClient.get<Employment[]>('./assets/data/employment.json');
  }

  getEmploymentHistoryItem(id: string): Observable<Employment> {
    return this.getEmploymentHistory().pipe(
      map(items => items.find(e => e.id.toString() === id))
    );
  }
}
