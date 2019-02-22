import { TestBed } from '@angular/core/testing';

import { ContactsStateService } from './contacts-state.service';

describe('ContactsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsStateService = TestBed.get(ContactsStateService);
    expect(service).toBeTruthy();
  });
});
