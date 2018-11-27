import { async, TestBed } from '@angular/core/testing';
import { NgxSignalrWrapperNgrxModule } from './ngx-signalr-wrapper-ngrx.module';

describe('NgxSignalrWrapperNgrxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxSignalrWrapperNgrxModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxSignalrWrapperNgrxModule).toBeDefined();
  });
});
