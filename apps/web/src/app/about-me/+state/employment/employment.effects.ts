import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { EmploymentItemComponent } from '../../containers/employment-item.component';
import { EmploymentService } from '../../services/employment.service';
import {
  EmploymentActionTypes,
  GetEmploymentHistoryError,
  GetEmploymentHistoryItemStart,
  GetEmploymentHistoryItemSuccess,
  GetEmploymentHistoryStart,
  GetEmploymentHistorySuccess
} from './employment.actions';
import { EmploymentPartialState } from './employment.reducer';

@Injectable()
export class EmploymentEffects {
  @Effect()
  getEmploymentHistoryStart$ = this.dataPersistence.fetch(
    EmploymentActionTypes.GetEmploymentHistoryStart,
    {
      run: () =>
        this.employment
          .getEmploymentHistory()
          .pipe(map(items => new GetEmploymentHistorySuccess(items))),
      onError: (action: GetEmploymentHistoryStart, error) => {
        console.error('Error', error);
        return new GetEmploymentHistoryError(error);
      }
    }
  );

  @Effect()
  getEmploymentHistoryItemNavigate$ = this.dataPersistence.navigation(
    EmploymentItemComponent,
    {
      run: (route: ActivatedRouteSnapshot) =>
        new GetEmploymentHistoryItemStart(route.params.id),
      onError: (route: ActivatedRouteSnapshot, error) => {
        console.error('Error', error);
        return new GetEmploymentHistoryError(error);
      }
    }
  );

  @Effect()
  getEmploymentHistoryItemStart$ = this.dataPersistence.fetch(
    EmploymentActionTypes.GetEmploymentHistoryItemStart,
    {
      run: (action: GetEmploymentHistoryItemStart) =>
        this.employment
          .getEmploymentHistoryItem(action.payload)
          .pipe(map(item => new GetEmploymentHistoryItemSuccess(item))),
      onError: (action: GetEmploymentHistoryItemStart, error) => {
        console.error('Error', error);
        return new GetEmploymentHistoryError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<EmploymentPartialState>,
    private employment: EmploymentService
  ) {}
}
