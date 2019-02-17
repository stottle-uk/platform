import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelParticipantsListComponent } from './channel-participants-list.component';

describe('ChannelParticipantsListComponent', () => {
  let component: ChannelParticipantsListComponent;
  let fixture: ComponentFixture<ChannelParticipantsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelParticipantsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelParticipantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
