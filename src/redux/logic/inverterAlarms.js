import { createLogic } from 'redux-logic';
import axios from 'axios';
import moment from 'moment';

import { MICROCONTROLLER_ADRESS, INVERTER_ALARMS_ENDPOINT } from '../config';

import {
  INVERTER_ALARMS_FETCH, INVERTER_ALARMS_FETCH_CANCEL, inverterAlarmsFetchFulfilled,
  inverterAlarmsFetchRejected, INVERTER_ALARMS_FETCH_REJECTED, INVERTER_ALARMS_FETCH_FULFILLED
} from '../actions/inverterAlarms';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const inverterAlarmsFetchLogic = createLogic({
  type: INVERTER_ALARMS_FETCH,
  cancelType: INVERTER_ALARMS_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: inverterAlarmsFetchFulfilled, // INVERTER_ALARMS_FETCH_FULFILLED, //
    failType: inverterAlarmsFetchRejected // INVERTER_ALARMS_FETCH_REJECTED //inverterAlarmsFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${INVERTER_ALARMS_ENDPOINT}`)
      .then((resp) => {
        const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = resp.data;

        return { data, lastUpdate };
      });
  }
});

export default [
  inverterAlarmsFetchLogic
];
