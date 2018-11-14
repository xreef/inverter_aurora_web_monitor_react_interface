
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'historical';

// action type constants
export const HISTORICAL_SET_LAYOUTS = 'HISTORICAL_SET_LAYOUTS';

export const actionTypes = {
  HISTORICAL_SET_LAYOUTS
};

// action creators
export const setHistoricalLayout = layouts => ({
  type: HISTORICAL_SET_LAYOUTS,
  layouts
});

export const actions = {
  setHistoricalLayout
};
