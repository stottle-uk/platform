import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SbUsersListItemComponent } from './users-list-item.component';

describe('UsersListItemComponent', () => {
  let component: SbUsersListItemComponent;
  let fixture: ComponentFixture<SbUsersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SbUsersListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbUsersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
