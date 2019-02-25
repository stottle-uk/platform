import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SendbirdUsersListItemComponent } from './send-bird-users-list-item.component';

describe('SendbirdUsersListItemComponent', () => {
  let component: SendbirdUsersListItemComponent;
  let fixture: ComponentFixture<SendbirdUsersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendbirdUsersListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendbirdUsersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
