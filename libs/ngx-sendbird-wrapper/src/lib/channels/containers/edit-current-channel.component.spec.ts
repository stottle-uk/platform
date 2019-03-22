import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrentChannelComponent } from './edit-current-channel.component';

describe('EditCurrentChannelComponent', () => {
  let component: EditCurrentChannelComponent;
  let fixture: ComponentFixture<EditCurrentChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCurrentChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCurrentChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
