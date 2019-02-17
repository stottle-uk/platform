import { TestBed } from '@angular/core/testing';

import { SendbirdComponentResolverService } from './sendbird-component-resolver.service';

describe('SendbirdComponentResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendbirdComponentResolverService = TestBed.get(SendbirdComponentResolverService);
    expect(service).toBeTruthy();
  });
});
