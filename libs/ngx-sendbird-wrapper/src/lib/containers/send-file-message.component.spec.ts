import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SendFileMessageComponent } from './send-file-message.component';

describe('SendFileMessageComponent', () => {
  let component: SendFileMessageComponent;
  let fixture: ComponentFixture<SendFileMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendFileMessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFileMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
