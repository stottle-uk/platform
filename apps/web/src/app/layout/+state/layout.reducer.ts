import { LayoutAction, LayoutActionTypes } from './layout.actions';

export const LAYOUT_FEATURE_KEY = 'layout';

export interface LayoutState {
  isSideNavOpen: boolean;
}

export interface LayoutPartialState {
  readonly [LAYOUT_FEATURE_KEY]: LayoutState;
}

export const initialState: LayoutState = {
  isSideNavOpen: false
};

export function layoutReducer(
  state: LayoutState = initialState,
  action: LayoutAction
): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.OpenSideNav: {
      return {
        ...state,
        isSideNavOpen: true
      };
    }

    case LayoutActionTypes.CloseSideNav: {
      return {
        ...state,
        isSideNavOpen: false
      };
    }

    default:
      return state;
  }
}
