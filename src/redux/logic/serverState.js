import { createLogic } from 'redux-logic';
import axios from 'axios';
import moment from 'moment';

import { MICROCONTROLLER_ADRESS, SERVER_STATE_ENDPOINT } from '../config';

import {
  SERVER_STATE_FETCH, SERVER_STATE_FETCH_CANCEL, serverStateFetchFulfilled,
  serverStateFetchRejected, SERVER_STATE_FETCH_REJECTED, SERVER_STATE_FETCH_FULFILLED
} from '../actions/serverState';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const serverStateFetchLogic = createLogic({
  type: SERVER_STATE_FETCH,
  cancelType: SERVER_STATE_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: serverStateFetchFulfilled, // SERVER_STATE_FETCH_FULFILLED, //
    failType: serverStateFetchRejected // SERVER_STATE_FETCH_REJECTED //serverStateFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${SERVER_STATE_ENDPOINT}`)
      .then((resp) => {
        debugger
        const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = resp.data;

        return { data, lastUpdate };
      });
  }
});

export default [
  serverStateFetchLogic
];
