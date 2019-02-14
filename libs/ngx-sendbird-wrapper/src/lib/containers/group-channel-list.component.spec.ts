import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChannelListComponent } from './group-channel-list.component';

describe('GroupChannelListComponent', () => {
  let component: GroupChannelListComponent;
  let fixture: ComponentFixture<GroupChannelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChannelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
