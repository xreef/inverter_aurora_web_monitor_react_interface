
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'inverterDailyPower';

// action type constants
export const INVERTER_DAILY_POWER_FETCH = 'INVERTER_DAILY_POWER_FETCH';
export const INVERTER_DAILY_POWER_FETCH_CANCEL = 'INVERTER_DAILY_POWER_FETCH_CANCEL';
export const INVERTER_DAILY_POWER_FETCH_FULFILLED = 'INVERTER_DAILY_POWER_FETCH_FULFILLED';
export const INVERTER_DAILY_POWER_FETCH_REJECTED = 'INVERTER_DAILY_POWER_FETCH_REJECTED';

export const actionTypes = {
    INVERTER_DAILY_POWER_FETCH,
    INVERTER_DAILY_POWER_FETCH_CANCEL,
    INVERTER_DAILY_POWER_FETCH_FULFILLED,
    INVERTER_DAILY_POWER_FETCH_REJECTED
};

// action creators
export const inverterDailyPowerFetch = (day, dataType) => ({
            type: INVERTER_DAILY_POWER_FETCH,
            day: day,
            dataType: dataType
        });
export const inverterDailyPowerFetchCancel = () => (
    {
        type: INVERTER_DAILY_POWER_FETCH_CANCEL
    }
    );
export const inverterDailyPowerFetchFulfilled = (list) => ({
    type: INVERTER_DAILY_POWER_FETCH_FULFILLED,
    list: list
});
export const inverterDailyPowerFetchRejected = (err) => ({
    type: INVERTER_DAILY_POWER_FETCH_REJECTED,
    err: err,
    error: true
});

export const actions = {
    inverterDailyPowerFetch,
    inverterDailyPowerFetchCancel,
    inverterDailyPowerFetchFulfilled,
    inverterDailyPowerFetchRejected
};
