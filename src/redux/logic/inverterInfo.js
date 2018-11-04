import { createLogic } from 'redux-logic';
import axios from 'axios';
import moment from 'moment';

import { MICROCONTROLLER_ADRESS, INVERTER_INFO_ENDPOINT } from '../config';

import {
  INVERTER_INFO_FETCH, INVERTER_INFO_FETCH_CANCEL, inverterInfoFetchFulfilled,
  inverterInfoFetchRejected, INVERTER_INFO_FETCH_REJECTED, INVERTER_INFO_FETCH_FULFILLED
} from '../actions/inverterInfo';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const inverterInfoFetchLogic = createLogic({
  type: INVERTER_INFO_FETCH,
  cancelType: INVERTER_INFO_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: inverterInfoFetchFulfilled, // INVERTER_INFO_FETCH_FULFILLED, //
    failType: inverterInfoFetchRejected // INVERTER_INFO_FETCH_REJECTED //inverterInfoFetchRejecte
  },

  process({ getState, action }, dispatch, done) {
    return axios.get(`http://${MICROCONTROLLER_ADRESS}/${INVERTER_INFO_ENDPOINT}`)
      .then((resp) => {
        const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = resp.data;

        return { data, lastUpdate };
      });
  }
});

export default [
  inverterInfoFetchLogic
];
