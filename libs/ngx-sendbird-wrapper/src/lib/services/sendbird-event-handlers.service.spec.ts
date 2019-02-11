import { TestBed } from '@angular/core/testing';

import { SendbirdEventHandlersService } from './sendbird-event-handlers.service';

describe('SendbirdEventHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendbirdEventHandlersService = TestBed.get(SendbirdEventHandlersService);
    expect(service).toBeTruthy();
  });
});
