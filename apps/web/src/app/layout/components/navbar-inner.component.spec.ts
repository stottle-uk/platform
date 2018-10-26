import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInnerComponent } from './navbar-inner.component';

describe('NavbarInnerComponent', () => {
  let component: NavbarInnerComponent;
  let fixture: ComponentFixture<NavbarInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
