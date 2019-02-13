import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelListItemComponent } from './channel-list-item.component';

describe('ChannelListItemComponent', () => {
  let component: ChannelListItemComponent;
  let fixture: ComponentFixture<ChannelListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
