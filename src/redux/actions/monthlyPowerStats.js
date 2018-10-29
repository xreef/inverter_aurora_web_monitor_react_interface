
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'monthlyPowerStats';

// action type constants
export const MONTHLY_POWER_STATS_FETCH = 'MONTHLY_POWER_STATS_FETCH';
export const MONTHLY_POWER_STATS_FETCH_CANCEL = 'MONTHLY_POWER_STATS_FETCH_CANCEL';
export const MONTHLY_POWER_STATS_FETCH_FULFILLED = 'MONTHLY_POWER_STATS_FETCH_FULFILLED';
export const MONTHLY_POWER_STATS_FETCH_REJECTED = 'MONTHLY_POWER_STATS_FETCH_REJECTED';

export const actionTypes = {
    MONTHLY_POWER_STATS_FETCH,
    MONTHLY_POWER_STATS_FETCH_CANCEL,
    MONTHLY_POWER_STATS_FETCH_FULFILLED,
    MONTHLY_POWER_STATS_FETCH_REJECTED
};

// action creators
export const monthlyPowerStatsFetch = (month) => ({
            type: MONTHLY_POWER_STATS_FETCH,
            month: month
        });
export const monthlyPowerStatsFetchCancel = () => (
    {
        type: MONTHLY_POWER_STATS_FETCH_CANCEL
    }
    );
export const monthlyPowerStatsFetchFulfilled = (payload) => ({
    type: MONTHLY_POWER_STATS_FETCH_FULFILLED,
    list: payload.data,
    lastUpdate: payload.lastUpdate
});
export const monthlyPowerStatsFetchRejected = (err) => ({
    type: MONTHLY_POWER_STATS_FETCH_REJECTED,
    err: err,
    error: true
});

export const actions = {
    monthlyPowerStatsFetch,
    monthlyPowerStatsFetchCancel,
    monthlyPowerStatsFetchFulfilled,
    monthlyPowerStatsFetchRejected
};
