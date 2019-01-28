import { TestBed } from '@angular/core/testing';
import { SendBirdService } from './sendbird.service';

describe('SendbirdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendBirdService = TestBed.get(SendBirdService);
    expect(service).toBeTruthy();
  });
});
