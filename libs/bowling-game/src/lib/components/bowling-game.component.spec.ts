import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingGameComponent } from './bowling-game.component';

describe('BowlingGameComponent', () => {
  let component: BowlingGameComponent;
  let fixture: ComponentFixture<BowlingGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowlingGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
