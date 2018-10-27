import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingKatasComponent } from './coding-katas.component';

describe('CodingKatasComponent', () => {
  let component: CodingKatasComponent;
  let fixture: ComponentFixture<CodingKatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingKatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingKatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
