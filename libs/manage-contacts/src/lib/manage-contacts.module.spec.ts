import { async, TestBed } from '@angular/core/testing';
import { ManageContactsModule } from './manage-contacts.module';

describe('ManageContactsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ManageContactsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ManageContactsModule).toBeDefined();
  });
});
