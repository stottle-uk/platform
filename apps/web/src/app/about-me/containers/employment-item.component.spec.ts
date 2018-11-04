import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentItemComponent } from './employment-item.component';

describe('EmploymentItemComponent', () => {
  let component: EmploymentItemComponent;
  let fixture: ComponentFixture<EmploymentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
