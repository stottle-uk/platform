import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SendBirdMessageFormComponent } from './send-bird-message-form.component';

describe('SendBirdMessageFormComponent', () => {
  let component: SendBirdMessageFormComponent;
  let fixture: ComponentFixture<SendBirdMessageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendBirdMessageFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBirdMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
