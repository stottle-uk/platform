import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { RouterEffects } from './router.effects';

describe('RouterEffects', () => {
  let actions$: Observable<any>;
  let effects: RouterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        RouterEffects,
        { provide: APP_BASE_HREF, useValue: '/' },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RouterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
