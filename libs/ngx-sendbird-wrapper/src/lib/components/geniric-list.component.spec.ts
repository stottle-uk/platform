import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GeniricListComponent } from './geniric-list.component';

describe('GeniricListComponent', () => {
  let component: GeniricListComponent<any, any>;
  let fixture: ComponentFixture<GeniricListComponent<any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeniricListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeniricListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
