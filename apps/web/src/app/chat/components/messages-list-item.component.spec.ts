import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesListItemComponent } from './messages-list-item.component';

describe('MessageFormComponent', () => {
  let component: MessagesListItemComponent;
  let fixture: ComponentFixture<MessagesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
