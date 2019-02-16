import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesListInnerComponent } from './messages-list-inner.component';

describe('MessagesListInnerComponent', () => {
  let component: MessagesListInnerComponent;
  let fixture: ComponentFixture<MessagesListInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesListInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesListInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
