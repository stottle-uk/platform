import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EmploymentAction, EmploymentActionTypes } from './employment.actions';
import { Employment } from './employment.model';

export const EMPLOYMENT_FEATURE_KEY = 'employment';

export interface EmploymentState extends EntityState<Employment> {
  selectedId: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export interface EmploymentPartialState {
  readonly [EMPLOYMENT_FEATURE_KEY]: EmploymentState;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<Employment>({
  selectId: employment => employment.id,
  sortComparer: false
});

export const initialState: EmploymentState = adapter.getInitialState({
  selectedId: null,
  loading: false,
  loaded: false,
  error: null
});

export function employmentReducer(
  state: EmploymentState = initialState,
  action: EmploymentAction
): EmploymentState {
  switch (action.type) {
    case EmploymentActionTypes.GetEmploymentHistorySuccess: {
      return adapter.addMany(action.payload, state);
    }

    case EmploymentActionTypes.GetEmploymentHistoryItemStart: {
      return {
        ...state,
        selectedId: action.payload
      };
    }

    case EmploymentActionTypes.GetEmploymentHistoryItemSuccess: {
      return adapter.upsertOne(action.payload, state);
    }

    default: {
      return state;
    }
  }
}
