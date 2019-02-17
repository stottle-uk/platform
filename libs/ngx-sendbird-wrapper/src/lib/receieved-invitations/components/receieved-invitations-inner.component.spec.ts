import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceievedInvitationsInnerComponent } from './receieved-invitations-inner.component';

describe('ReceievedInvitationsInnerComponent', () => {
  let component: ReceievedInvitationsInnerComponent;
  let fixture: ComponentFixture<ReceievedInvitationsInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceievedInvitationsInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceievedInvitationsInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
