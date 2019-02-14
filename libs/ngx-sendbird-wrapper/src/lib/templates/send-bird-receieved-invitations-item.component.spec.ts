import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBirdReceievedInvitationsItemComponent } from './send-bird-receieved-invitations-item.component';

describe('SendBirdReceievedInvitationsItemComponent', () => {
  let component: SendBirdReceievedInvitationsItemComponent;
  let fixture: ComponentFixture<SendBirdReceievedInvitationsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBirdReceievedInvitationsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBirdReceievedInvitationsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
