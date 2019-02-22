import { TestBed } from '@angular/core/testing';

import { UsersViewStateService } from './users-view-state.service';

describe('UsersViewStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersViewStateService = TestBed.get(UsersViewStateService);
    expect(service).toBeTruthy();
  });
});
