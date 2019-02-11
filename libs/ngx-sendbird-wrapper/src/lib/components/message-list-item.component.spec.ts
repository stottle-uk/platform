import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListItemComponent } from './message-list-item.component';

describe('MessageListItemComponent', () => {
  let component: MessageListItemComponent;
  let fixture: ComponentFixture<MessageListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
