import {
  key, HISTORICAL_SET_LAYOUTS
} from '../actions/historical';

export const selectors = {
  layouts: state => state.historical.layouts
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HISTORICAL_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
