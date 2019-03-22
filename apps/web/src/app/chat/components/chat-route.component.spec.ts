import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRouteComponent } from './chat-route.component';

describe('ChatRouteComponent', () => {
  let component: ChatRouteComponent;
  let fixture: ComponentFixture<ChatRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
