import { createLogic } from 'redux-logic';
import axios from 'axios';
import moment from 'moment';

import { MICROCONTROLLER_ADRESS, PRODUCTION_ENDPOINT } from '../config';

import {
  INVERTER_DAILY_POWER_FETCH, INVERTER_DAILY_POWER_FETCH_CANCEL, inverterDailyPowerFetchFulfilled,
  inverterDailyPowerFetchRejected
} from '../actions/inverterDailyPower';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const inverterDailyPowerFetchLogic = createLogic({
  type: INVERTER_DAILY_POWER_FETCH,
  cancelType: INVERTER_DAILY_POWER_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: inverterDailyPowerFetchFulfilled,
    failType: inverterDailyPowerFetchRejected
  },

  process({ getState, action }, dispatch, done) {
    return axios.get(`http://${MICROCONTROLLER_ADRESS}/${PRODUCTION_ENDPOINT}?day=${action.day}&type=${action.dataType}`)
      .then(resp => resp.data.data.map((elem) => {
        elem.date = new Date(moment(action.day + elem.h, 'YYYYMMDDHHmm').valueOf());
        elem.power = elem.val;
        return elem;
      }));
    // .then(data => dispatch({ type: INVERTER_DAILY_POWER_FETCH_FULFILLED, payload: data }))
    // .catch(err => {
    //     console.error(err); // log since might be a render err
    //     dispatch({ type: INVERTER_DAILY_POWER_FETCH_REJECTED, payload: err, error: true });
    // })
    // .then(() => done()); // call when finished dispatching;
  }
});

export default [
  inverterDailyPowerFetchLogic
];
