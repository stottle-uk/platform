import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListInnerComponent } from './users-list-inner.component';

describe('UsersListInnerComponent', () => {
  let component: UsersListInnerComponent;
  let fixture: ComponentFixture<UsersListInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
