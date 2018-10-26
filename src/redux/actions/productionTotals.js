
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'productionTotals';

// action type constants
export const PRODUCTION_TOTALS_FETCH = 'PRODUCTION_TOTALS_FETCH';
export const PRODUCTION_TOTALS_FETCH_CANCEL = 'PRODUCTION_TOTALS_FETCH_CANCEL';
export const PRODUCTION_TOTALS_FETCH_FULFILLED = 'PRODUCTION_TOTALS_FETCH_FULFILLED';
export const PRODUCTION_TOTALS_FETCH_REJECTED = 'PRODUCTION_TOTALS_FETCH_REJECTED';

export const actionTypes = {
    PRODUCTION_TOTALS_FETCH,
    PRODUCTION_TOTALS_FETCH_CANCEL,
    PRODUCTION_TOTALS_FETCH_FULFILLED,
    PRODUCTION_TOTALS_FETCH_REJECTED
};

// action creators
export const productionTotalsFetch = () => ({
            type: PRODUCTION_TOTALS_FETCH
        });
export const productionTotalsFetchCancel = () => (
    {
        type: PRODUCTION_TOTALS_FETCH_CANCEL
    }
    );
export const productionTotalsFetchFulfilled = (payload) => ({
    type: PRODUCTION_TOTALS_FETCH_FULFILLED,
    energyLifetime:payload.energyLifetime,
    energyYearly:payload.energyYearly,
    energyMonthly:payload.energyMonthly,
    energyWeekly:payload.energyWeekly,
    lastUpdate:payload.lastUpdate
});
export const productionTotalsFetchRejected = (err) => ({
    type: PRODUCTION_TOTALS_FETCH_REJECTED,
    err: err,
    error: true
});

export const actions = {
    productionTotalsFetch,
    productionTotalsFetchCancel,
    productionTotalsFetchFulfilled,
    productionTotalsFetchRejected
};
