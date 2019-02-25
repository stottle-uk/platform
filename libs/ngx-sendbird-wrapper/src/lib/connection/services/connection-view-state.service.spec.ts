import { TestBed } from '@angular/core/testing';
import { ConnectionViewStateService } from './connection-view-state.service';

describe('ConnectionViewStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectionViewStateService = TestBed.get(
      ConnectionViewStateService
    );
    expect(service).toBeTruthy();
  });
});
