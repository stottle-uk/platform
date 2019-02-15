import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericListComponent } from './generic-list.component';

describe('GenericListComponent', () => {
  let component: GenericListComponent<any, any>;
  let fixture: ComponentFixture<GenericListComponent<any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenericListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
