import { TestBed } from '@angular/core/testing';

import { SendbirdViewStateService } from './sendbird-view-state.service';

describe('SendbirdViewStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendbirdViewStateService = TestBed.get(SendbirdViewStateService);
    expect(service).toBeTruthy();
  });
});
