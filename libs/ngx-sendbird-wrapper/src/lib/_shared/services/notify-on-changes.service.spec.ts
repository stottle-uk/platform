import { TestBed } from '@angular/core/testing';

import { NotifyOnChangesService } from './notify-on-changes.service';

describe('NotifyOnChangesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotifyOnChangesService = TestBed.get(NotifyOnChangesService);
    expect(service).toBeTruthy();
  });
});
