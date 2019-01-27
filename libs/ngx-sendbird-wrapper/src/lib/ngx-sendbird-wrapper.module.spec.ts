import { async, TestBed } from '@angular/core/testing';
import { NgxSendbirdWrapperModule } from './ngx-sendbird-wrapper.module';

describe('NgxSendbirdWrapperModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxSendbirdWrapperModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxSendbirdWrapperModule).toBeDefined();
  });
});
