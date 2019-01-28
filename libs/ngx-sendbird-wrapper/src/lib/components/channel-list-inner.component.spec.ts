import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListInnerComponent } from './channel-list-inner.component';

describe('ChannelListInnerComponent', () => {
  let component: ChannelListInnerComponent;
  let fixture: ComponentFixture<ChannelListInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelListInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelListInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
