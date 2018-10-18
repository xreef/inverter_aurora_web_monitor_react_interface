
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'inverterDaily';

// action type constants
export const INVERTER_DAILY_FETCH = 'INVERTER_DAILY_FETCH';
export const INVERTER_DAILY_FETCH_CANCEL = 'INVERTER_DAILY_FETCH_CANCEL';
export const INVERTER_DAILY_FETCH_FULFILLED = 'INVERTER_DAILY_FETCH_FULFILLED';
export const INVERTER_DAILY_FETCH_REJECTED = 'INVERTER_DAILY_FETCH_REJECTED';

export const actionTypes = {
    INVERTER_DAILY_FETCH,
    INVERTER_DAILY_FETCH_CANCEL,
    INVERTER_DAILY_FETCH_FULFILLED,
    INVERTER_DAILY_FETCH_REJECTED
};

// action creators
export const inverterDailyFetch = (dataType, day) => ({
            type: INVERTER_DAILY_FETCH,
            day: day,
            dataType: dataType
        });
export const inverterDailyFetchCancel = () => ({ type: INVERTER_DAILY_FETCH_CANCEL });
export const inverterDailyFetchFulfilled = (inverterDaily) => {debugger; return {
    type: INVERTER_DAILY_FETCH_FULFILLED,
    payload: inverterDaily
}};
export const inverterDailyFetchRejected = (err) => ({
    type: INVERTER_DAILY_FETCH_REJECTED,
    payload: err,
    error: true
});

export const actions = {
    inverterDailyFetch,
    inverterDailyFetchCancel,
    inverterDailyFetchFulfilled,
    inverterDailyFetchRejected
};
