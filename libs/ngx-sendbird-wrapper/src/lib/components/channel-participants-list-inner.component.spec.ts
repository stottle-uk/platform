import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelParticipantsListInnerComponent } from './channel-participants-list-inner.component';

describe('ChannelParticipantsListInnerComponent', () => {
  let component: ChannelParticipantsListInnerComponent;
  let fixture: ComponentFixture<ChannelParticipantsListInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelParticipantsListInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelParticipantsListInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
