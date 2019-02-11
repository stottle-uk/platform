import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMessageComponent } from './delete-message.component';

describe('DeleteMessageComponent', () => {
  let component: DeleteMessageComponent;
  let fixture: ComponentFixture<DeleteMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
