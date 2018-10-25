import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from './router.actions';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router, private location: Location) {}

  @Effect({ dispatch: false })
  navigate$: Observable<void> = this.actions$.pipe(
    ofType<fromActions.Go>(fromActions.RouterActionTypes.Go),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    ),
    switchMap(() => EMPTY)
  );

  @Effect({ dispatch: false })
  navigateBack$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.Back>(fromActions.RouterActionTypes.Back),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.Forward>(fromActions.RouterActionTypes.Forward),
    tap(() => this.location.forward())
  );
}
