
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'configuration';

// action type constants
export const CONFIGURATION_FETCH = 'CONFIGURATION_FETCH';
export const CONFIGURATION_FETCH_CANCEL = 'CONFIGURATION_FETCH_CANCEL';
export const CONFIGURATION_FETCH_FULFILLED = 'CONFIGURATION_FETCH_FULFILLED';
export const CONFIGURATION_FETCH_REJECTED = 'CONFIGURATION_FETCH_REJECTED';

export const actionTypes = {
  CONFIGURATION_FETCH,
  CONFIGURATION_FETCH_CANCEL,
  CONFIGURATION_FETCH_FULFILLED,
  CONFIGURATION_FETCH_REJECTED
};

// action creators
export const configurationFetch = () => ({
  type: CONFIGURATION_FETCH
});
export const configurationFetchCancel = () => (
  {
    type: CONFIGURATION_FETCH_CANCEL
  }
);
export const configurationFetchFulfilled = payload => ({
  type: CONFIGURATION_FETCH_FULFILLED,
  data: payload.data,
  lastUpdate: payload.lastUpdate
});
export const configurationFetchRejected = err => ({
  type: CONFIGURATION_FETCH_REJECTED,
  err,
  error: true
});

export const actions = {
  configurationFetch,
  configurationFetchCancel,
  configurationFetchFulfilled,
  configurationFetchRejected
};
