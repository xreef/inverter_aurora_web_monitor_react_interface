
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'inverterInfoState';

// action type constants
export const INVERTER_INFO_STATE_SET_LAYOUTS = 'INVERTER_INFO_STATE_SET_LAYOUTS';

export const actionTypes = {
  INVERTER_INFO_STATE_SET_LAYOUTS
};

// action creators
export const setInverterInfoStateLayout = layouts => ({
  type: INVERTER_INFO_STATE_SET_LAYOUTS,
  layouts
});

export const actions = {
  setInverterInfoStateLayout
};
