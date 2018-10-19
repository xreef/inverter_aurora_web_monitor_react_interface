
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'inverterDailyCurrent';

// action type constants
export const INVERTER_DAILY_CURRENT_FETCH = 'INVERTER_DAILY_CURRENT_FETCH';
export const INVERTER_DAILY_CURRENT_FETCH_CANCEL = 'INVERTER_DAILY_CURRENT_FETCH_CANCEL';
export const INVERTER_DAILY_CURRENT_FETCH_FULFILLED = 'INVERTER_DAILY_CURRENT_FETCH_FULFILLED';
export const INVERTER_DAILY_CURRENT_FETCH_REJECTED = 'INVERTER_DAILY_CURRENT_FETCH_REJECTED';

export const actionTypes = {
    INVERTER_DAILY_CURRENT_FETCH,
    INVERTER_DAILY_CURRENT_FETCH_CANCEL,
    INVERTER_DAILY_CURRENT_FETCH_FULFILLED,
    INVERTER_DAILY_CURRENT_FETCH_REJECTED
};

// action creators
export const inverterDailyCurrentFetch = (day, dataType) => ({
            type: INVERTER_DAILY_CURRENT_FETCH,
            day: day,
            dataType: dataType
        });
export const inverterDailyCurrentFetchCancel = () => (
    {
        type: INVERTER_DAILY_CURRENT_FETCH_CANCEL
    }
    );
export const inverterDailyCurrentFetchFulfilled = (list) => ({
    type: INVERTER_DAILY_CURRENT_FETCH_FULFILLED,
    list: list
});
export const inverterDailyCurrentFetchRejected = (err) => ({
    type: INVERTER_DAILY_CURRENT_FETCH_REJECTED,
    err: err,
    error: true
});

export const actions = {
    inverterDailyCurrentFetch,
    inverterDailyCurrentFetchCancel,
    inverterDailyCurrentFetchFulfilled,
    inverterDailyCurrentFetchRejected
};
