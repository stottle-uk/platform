import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMePageComponent } from './about-me-page.component';

describe('AboutMePageComponent', () => {
  let component: AboutMePageComponent;
  let fixture: ComponentFixture<AboutMePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
