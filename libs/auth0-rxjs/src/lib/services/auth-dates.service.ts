import { Injectable } from '@angular/core';

@Injectable()
export class AuthDatesService {
  getTime(): number {
    return new Date().getTime();
  }
}
