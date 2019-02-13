import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOpenChannelComponent } from './create-open-channel.component';

describe('CreateOpenChannelComponent', () => {
  let component: CreateOpenChannelComponent;
  let fixture: ComponentFixture<CreateOpenChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOpenChannelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOpenChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
