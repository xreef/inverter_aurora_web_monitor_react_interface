
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'inverterAlarms';

// action type constants
export const INVERTER_ALARMS_FETCH = 'INVERTER_ALARMS_FETCH';
export const INVERTER_ALARMS_FETCH_CANCEL = 'INVERTER_ALARMS_FETCH_CANCEL';
export const INVERTER_ALARMS_FETCH_FULFILLED = 'INVERTER_ALARMS_FETCH_FULFILLED';
export const INVERTER_ALARMS_FETCH_REJECTED = 'INVERTER_ALARMS_FETCH_REJECTED';

export const actionTypes = {
  INVERTER_ALARMS_FETCH,
  INVERTER_ALARMS_FETCH_CANCEL,
  INVERTER_ALARMS_FETCH_FULFILLED,
  INVERTER_ALARMS_FETCH_REJECTED
};

// action creators
export const inverterAlarmsFetch = () => ({
  type: INVERTER_ALARMS_FETCH
});
export const inverterAlarmsFetchCancel = () => (
  {
    type: INVERTER_ALARMS_FETCH_CANCEL
  }
);
export const inverterAlarmsFetchFulfilled = payload => ({
  type: INVERTER_ALARMS_FETCH_FULFILLED,
  data: payload.data,
  lastUpdate: payload.lastUpdate
});
export const inverterAlarmsFetchRejected = err => ({
  type: INVERTER_ALARMS_FETCH_REJECTED,
  err,
  error: true
});

export const actions = {
  inverterAlarmsFetch,
  inverterAlarmsFetchCancel,
  inverterAlarmsFetchFulfilled,
  inverterAlarmsFetchRejected
};
