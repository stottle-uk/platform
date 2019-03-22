import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOpenChannelFormComponent } from './edit-open-channel-form.component';

describe('EditOpenChannelFormComponent', () => {
  let component: EditOpenChannelFormComponent;
  let fixture: ComponentFixture<EditOpenChannelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOpenChannelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOpenChannelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
