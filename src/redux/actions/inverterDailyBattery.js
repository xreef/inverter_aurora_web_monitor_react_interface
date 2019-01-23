
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
import { MONTHLY_POWER_STATS_FETCH_FULFILLED } from './monthlyPowerStats';

export const key = 'inverterBattery';

// action type constants
export const INVERTER_BATTERY_FETCH = 'INVERTER_BATTERY_FETCH';
export const INVERTER_BATTERY_FETCH_CANCEL = 'INVERTER_BATTERY_FETCH_CANCEL';
export const INVERTER_BATTERY_FETCH_FULFILLED = 'INVERTER_BATTERY_FETCH_FULFILLED';
export const INVERTER_BATTERY_FETCH_REJECTED = 'INVERTER_BATTERY_FETCH_REJECTED';

export const actionTypes = {
  INVERTER_BATTERY_FETCH,
  INVERTER_BATTERY_FETCH_CANCEL,
  INVERTER_BATTERY_FETCH_FULFILLED,
  INVERTER_BATTERY_FETCH_REJECTED
};

// action creators
export const inverterBatteryFetch = (day, dataType) => ({
  type: INVERTER_BATTERY_FETCH,
  day,
  dataType
});
export const inverterBatteryFetchCancel = () => (
  {
    type: INVERTER_BATTERY_FETCH_CANCEL
  }
);
export const inverterBatteryFetchFulfilled = payload => ({
  type: INVERTER_BATTERY_FETCH_FULFILLED,
  list: payload.data,
  lastUpdate: payload.lastUpdate
});
export const inverterBatteryFetchRejected = err => ({
  type: INVERTER_BATTERY_FETCH_REJECTED,
  err,
  error: true
});

export const actions = {
  inverterBatteryFetch,
  inverterBatteryFetchCancel,
  inverterBatteryFetchFulfilled,
  inverterBatteryFetchRejected
};
