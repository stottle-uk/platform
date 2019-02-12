import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterChannelComponent } from './enter-channel.component';

describe('EnterChannelComponent', () => {
  let component: EnterChannelComponent;
  let fixture: ComponentFixture<EnterChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
