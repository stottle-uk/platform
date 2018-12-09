import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsListInnerComponent } from './contacts-list-inner.component';

describe('ContactsListInnerComponent', () => {
  let component: ContactsListInnerComponent;
  let fixture: ComponentFixture<ContactsListInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsListInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
