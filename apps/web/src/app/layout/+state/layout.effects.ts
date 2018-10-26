import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { LayoutPartialState } from './layout.reducer';

@Injectable()
export class LayoutEffects {
  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<LayoutPartialState>
  ) {}
}
