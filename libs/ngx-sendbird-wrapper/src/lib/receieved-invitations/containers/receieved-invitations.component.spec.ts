import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceievedInvitationsComponent } from './receieved-invitations.component';

describe('ReceievedInvitationsComponent', () => {
  let component: ReceievedInvitationsComponent;
  let fixture: ComponentFixture<ReceievedInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceievedInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceievedInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
