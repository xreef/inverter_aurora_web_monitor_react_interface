
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'inverterInfo';

// action type constants
export const INVERTER_INFO_FETCH = 'INVERTER_INFO_FETCH';
export const INVERTER_INFO_FETCH_CANCEL = 'INVERTER_INFO_FETCH_CANCEL';
export const INVERTER_INFO_FETCH_FULFILLED = 'INVERTER_INFO_FETCH_FULFILLED';
export const INVERTER_INFO_FETCH_REJECTED = 'INVERTER_INFO_FETCH_REJECTED';

export const actionTypes = {
    INVERTER_INFO_FETCH,
    INVERTER_INFO_FETCH_CANCEL,
    INVERTER_INFO_FETCH_FULFILLED,
    INVERTER_INFO_FETCH_REJECTED
};

// action creators
export const inverterInfoFetch = () => ({
            type: INVERTER_INFO_FETCH
        });
export const inverterInfoFetchCancel = () => (
    {
        type: INVERTER_INFO_FETCH_CANCEL
    }
    );
export const inverterInfoFetchFulfilled = (payload) => ({
    type: INVERTER_INFO_FETCH_FULFILLED,
    data: payload.data,
    lastUpdate: payload.lastUpdate
});
export const inverterInfoFetchRejected = (err) => ({
    type: INVERTER_INFO_FETCH_REJECTED,
    err: err,
    error: true
});

export const actions = {
    inverterInfoFetch,
    inverterInfoFetchCancel,
    inverterInfoFetchFulfilled,
    inverterInfoFetchRejected
};
