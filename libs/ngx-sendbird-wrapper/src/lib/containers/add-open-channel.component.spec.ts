import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpenChannelComponent } from './add-open-channel.component';

describe('AddOpenChannelComponent', () => {
  let component: AddOpenChannelComponent;
  let fixture: ComponentFixture<AddOpenChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOpenChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpenChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
