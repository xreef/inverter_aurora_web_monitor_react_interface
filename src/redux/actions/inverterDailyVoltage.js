
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'inverterDailyVoltage';

// action type constants
export const INVERTER_DAILY_VOLTAGE_FETCH = 'INVERTER_DAILY_VOLTAGE_FETCH';
export const INVERTER_DAILY_VOLTAGE_FETCH_CANCEL = 'INVERTER_DAILY_VOLTAGE_FETCH_CANCEL';
export const INVERTER_DAILY_VOLTAGE_FETCH_FULFILLED = 'INVERTER_DAILY_VOLTAGE_FETCH_FULFILLED';
export const INVERTER_DAILY_VOLTAGE_FETCH_REJECTED = 'INVERTER_DAILY_VOLTAGE_FETCH_REJECTED';

export const actionTypes = {
    INVERTER_DAILY_VOLTAGE_FETCH,
    INVERTER_DAILY_VOLTAGE_FETCH_CANCEL,
    INVERTER_DAILY_VOLTAGE_FETCH_FULFILLED,
    INVERTER_DAILY_VOLTAGE_FETCH_REJECTED
};

// action creators
export const inverterDailyVoltageFetch = (day, dataType) => ({
            type: INVERTER_DAILY_VOLTAGE_FETCH,
            day: day,
            dataType: dataType
        });
export const inverterDailyVoltageFetchCancel = () => (
    {
        type: INVERTER_DAILY_VOLTAGE_FETCH_CANCEL
    }
    );
export const inverterDailyVoltageFetchFulfilled = (list) => ({
    type: INVERTER_DAILY_VOLTAGE_FETCH_FULFILLED,
    list: list
});
export const inverterDailyVoltageFetchRejected = (err) => ({
    type: INVERTER_DAILY_VOLTAGE_FETCH_REJECTED,
    err: err,
    error: true
});

export const actions = {
    inverterDailyVoltageFetch,
    inverterDailyVoltageFetchCancel,
    inverterDailyVoltageFetchFulfilled,
    inverterDailyVoltageFetchRejected
};
