import { createLogic } from 'redux-logic';
import axios from "axios";
import moment from 'moment';

import { INVERTER_DAILY_FETCH, INVERTER_DAILY_FETCH_CANCEL, inverterDailyFetchFulfilled,
    inverterDailyFetchRejected, INVERTER_DAILY_FETCH_REJECTED, INVERTER_DAILY_FETCH_FULFILLED } from '../actions/inverterDaily';

const delay = 4; // 4s delay for interactive use of cancel/take latest

const inverterDailyFetchLogic = createLogic({
    type: INVERTER_DAILY_FETCH,
    cancelType: INVERTER_DAILY_FETCH_CANCEL,
    latest: true, // take latest only

    processOptions: {
        dispatchReturn: true,
        successType: inverterDailyFetchFulfilled, //INVERTER_DAILY_FETCH_FULFILLED, //
        failType: inverterDailyFetchRejected //INVERTER_DAILY_FETCH_REJECTED //inverterDailyFetchRejected
    },

    process({ getState, action }, dispatch, done) {
        return axios.get(`http://192.168.1.101:8080/production?day=${action.day}&type=${action.dataType}`)
            .then(resp => (resp.data.data.map(elem => {
                debugger
                    elem.date = new Date(moment(action.day+elem.h, "YYYYMMDDHHmm").valueOf());
                    elem.power = elem.val;
                    return elem;
                })
            ))
            // .then(data => dispatch({ type: INVERTER_DAILY_FETCH_FULFILLED, payload: data }))
            // .catch(err => {
            //     console.error(err); // log since might be a render err
            //     dispatch({ type: INVERTER_DAILY_FETCH_REJECTED, payload: err, error: true });
            // })
            // .then(() => done()); // call when finished dispatching;
    }
});

export default [
    inverterDailyFetchLogic
];
