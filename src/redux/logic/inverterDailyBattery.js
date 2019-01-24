import { createLogic } from 'redux-logic';
import moment from 'moment';

import { MICROCONTROLLER_ADRESS, BATTERY_ENDPOINT } from '../config';

import {
  INVERTER_BATTERY_FETCH, INVERTER_BATTERY_FETCH_CANCEL, inverterBatteryFetchFulfilled,
  inverterBatteryFetchRejected, INVERTER_BATTERY_FETCH_REJECTED, INVERTER_BATTERY_FETCH_FULFILLED
} from '../actions/inverterDailyBattery';
import dates from '../../utils/date/dates';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const inverterBatteryFetchLogic = createLogic({
  type: INVERTER_BATTERY_FETCH,
  cancelType: INVERTER_BATTERY_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: inverterBatteryFetchFulfilled, // INVERTER_BATTERY_FETCH_FULFILLED, //
    failType: inverterBatteryFetchRejected // INVERTER_BATTERY_FETCH_REJECTED //inverterBatteryFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${BATTERY_ENDPOINT}?day=${action.day}`)
      .then((resp) => {
        const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());

        const data = [];
        Object.keys(resp.data.data).forEach((key) => {
          const dtStr = `${action.day} ${key}`;
          const md = moment(dtStr, 'YYYYMMDD HHmm');

          const elemento = {
            date: md.toDate(),
            val: resp.data.data[key]
          };

          data.push(elemento);
        });
        // debugger
        // data.sort((a, b) => dates.compare(a, b));
        return { data: [...data.sort((a, b) => dates.compare(a.date, b.date))], lastUpdate };
      });
    // .then(data => dispatch({ type: INVERTER_BATTERY_FETCH_FULFILLED, payload: data }))
    // .catch(err => {
    //     console.error(err); // log since might be a render err
    //     dispatch({ type: INVERTER_BATTERY_FETCH_REJECTED, payload: err, error: true });
    // })
    // .then(() => done()); // call when finished dispatching;
  }
});

export default [
  inverterBatteryFetchLogic
];
