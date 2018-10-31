import { createLogic } from 'redux-logic';
import axios from 'axios';
import moment from 'moment';

import { MICROCONTROLLER_ADRESS, PRODUCTION_ENDPOINT } from '../config';

import {
  INVERTER_DAILY_CURRENT_FETCH, INVERTER_DAILY_CURRENT_FETCH_CANCEL, inverterDailyCurrentFetchFulfilled,
  inverterDailyCurrentFetchRejected, INVERTER_DAILY_CURRENT_FETCH_REJECTED, INVERTER_DAILY_CURRENT_FETCH_FULFILLED
} from '../actions/inverterDailyCurrent';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const inverterDailyCurrentFetchLogic = createLogic({
  type: INVERTER_DAILY_CURRENT_FETCH,
  cancelType: INVERTER_DAILY_CURRENT_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: inverterDailyCurrentFetchFulfilled, // INVERTER_DAILY_CURRENT_FETCH_FULFILLED, //
    failType: inverterDailyCurrentFetchRejected // INVERTER_DAILY_CURRENT_FETCH_REJECTED //inverterDailyCurrentFetchRejecte
  },

  process({ getState, action }, dispatch, done) {
    return axios.get(`http://${MICROCONTROLLER_ADRESS}/${PRODUCTION_ENDPOINT}?day=${action.day}&type=${action.dataType}`)
      .then(resp => resp.data.data.map((elem) => {
        elem.date = new Date(moment(action.day + elem.h, 'YYYYMMDDHHmm').valueOf());
        elem.current = elem.val;
        return elem;
      }));
    // .then(data => dispatch({ type: INVERTER_DAILY_CURRENT_FETCH_FULFILLED, payload: data }))
    // .catch(err => {
    //     console.error(err); // log since might be a render err
    //     dispatch({ type: INVERTER_DAILY_CURRENT_FETCH_REJECTED, payload: err, error: true });
    // })
    // .then(() => done()); // call when finished dispatching;
  }
});

export default [
  inverterDailyCurrentFetchLogic
];
