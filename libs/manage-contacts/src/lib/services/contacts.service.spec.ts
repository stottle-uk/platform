import { TestBed } from '@angular/core/testing';
import { ContactsService } from './contacts.service';

describe('BowlingGameRollsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsService = TestBed.get(ContactsService);
    expect(service).toBeTruthy();
  });
});
