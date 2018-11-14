
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'daily';

// action type constants
export const DAILY_SET_LAYOUTS = 'DAILY_SET_LAYOUTS';

export const actionTypes = {
  DAILY_SET_LAYOUTS
};

// action creators
export const setDailyLayout = layouts => ({
  type: DAILY_SET_LAYOUTS,
  layouts
});

export const actions = {
  setDailyLayout
};
