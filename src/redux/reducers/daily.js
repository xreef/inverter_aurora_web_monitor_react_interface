import {
  key, DAILY_SET_LAYOUTS
} from '../actions/daily';

export const selectors = {
  layouts: state => state.daily.layouts
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DAILY_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
