import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMessageComponent } from './update-message.component';

describe('UpdateMessageComponent', () => {
  let component: UpdateMessageComponent;
  let fixture: ComponentFixture<UpdateMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
