import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelParticipantsListItemComponent } from './channel-participants-list-item.component';

describe('ChannelParticipantsListItemComponent', () => {
  let component: ChannelParticipantsListItemComponent;
  let fixture: ComponentFixture<ChannelParticipantsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelParticipantsListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelParticipantsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
