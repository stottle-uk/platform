import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchMoreMessagesBtnComponent } from './fetch-more-messages-btn.component';

describe('FetchMoreMessagesBtnComponent', () => {
  let component: FetchMoreMessagesBtnComponent;
  let fixture: ComponentFixture<FetchMoreMessagesBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchMoreMessagesBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchMoreMessagesBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
