import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageFileFormComponent } from './message-file-form.component';

describe('MessageFileFormComponent', () => {
  let component: MessageFileFormComponent;
  let fixture: ComponentFixture<MessageFileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageFileFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
