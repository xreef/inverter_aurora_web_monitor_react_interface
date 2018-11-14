import {
  key, INVERTER_INFO_STATE_SET_LAYOUTS
} from '../actions/inverterInfoState';

export const selectors = {
  layouts: state => state.inverterInfoState.layouts
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INVERTER_INFO_STATE_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
