import { TestBed } from '@angular/core/testing';

import { BowlingGameRollsService } from './bowling-game-rolls.service';

describe('BowlingGameRollsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BowlingGameRollsService = TestBed.get(BowlingGameRollsService);
    expect(service).toBeTruthy();
  });
});
