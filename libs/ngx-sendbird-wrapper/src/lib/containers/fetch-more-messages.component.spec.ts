import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchMoreMessagesComponent } from './fetch-more-messages.component';

describe('FetchMoreMessagesComponent', () => {
  let component: FetchMoreMessagesComponent;
  let fixture: ComponentFixture<FetchMoreMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchMoreMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchMoreMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
