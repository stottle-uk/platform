import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBirdChannelFormComponent } from './send-bird-channel-form.component';

describe('SendBirdChannelFormComponent', () => {
  let component: SendBirdChannelFormComponent;
  let fixture: ComponentFixture<SendBirdChannelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBirdChannelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBirdChannelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
