import { createLogic } from 'redux-logic';
import axios from "axios";
import moment from 'moment';

import {MICROCONTROLLER_ADRESS, MONTLY_POWER_STATS_ENDPOINT } from '../config';

import { MONTHLY_POWER_STATS_FETCH, MONTHLY_POWER_STATS_FETCH_CANCEL, monthlyPowerStatsFetchFulfilled,
    monthlyPowerStatsFetchRejected, MONTHLY_POWER_STATS_FETCH_REJECTED, MONTHLY_POWER_STATS_FETCH_FULFILLED } from '../actions/monthlyPowerStats';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const monthlyPowerStatsFetchLogic = createLogic({
    type: MONTHLY_POWER_STATS_FETCH,
    cancelType: MONTHLY_POWER_STATS_FETCH_CANCEL,
    latest: true, // take latest only

    processOptions: {
        dispatchReturn: true,
        successType: monthlyPowerStatsFetchFulfilled, //MONTHLY_POWER_STATS_FETCH_FULFILLED, //
        failType: monthlyPowerStatsFetchRejected //MONTHLY_POWER_STATS_FETCH_REJECTED //monthlyPowerStatsFetchRejecte
    },

    process({ getState, action }, dispatch, done) {
        return axios.get(`http://${MICROCONTROLLER_ADRESS}/${MONTLY_POWER_STATS_ENDPOINT}?month=${action.month}`)
            .then(resp => {

                let lastUpdate = new Date(moment(resp.data.lastUpdate, "DD/MM/YYYY HH:mm:ss").valueOf());

                let data = [];
                    Object.keys(resp.data.series).forEach(key => {
                            resp.data.series[key].date = new Date(moment(action.month + key, "YYYYMMDD"));
                            data.push(resp.data.series[key]);
                        }
                    );
                    return {data, lastUpdate};
                }
            )
    }
});

export default [
    monthlyPowerStatsFetchLogic
];
