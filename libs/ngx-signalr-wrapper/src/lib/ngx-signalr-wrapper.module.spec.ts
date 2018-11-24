import { async, TestBed } from '@angular/core/testing';
import { NgxSignalrWrapperModule } from './ngx-signalr-wrapper.module';

describe('NgxSignalrWrapperModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxSignalrWrapperModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxSignalrWrapperModule).toBeDefined();
  });
});
