import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditInnerComponent } from './contact-edit-inner.component';

describe('ContactEditInnerComponent', () => {
  let component: ContactEditInnerComponent;
  let fixture: ComponentFixture<ContactEditInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEditInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
