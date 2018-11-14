import { createLogic } from 'redux-logic';
import axios from 'axios';
import moment from 'moment';

import { MICROCONTROLLER_ADRESS, PRODUCTION_TOTALS_ENDPOINT } from '../config';

import {
  PRODUCTION_TOTALS_FETCH, PRODUCTION_TOTALS_FETCH_CANCEL, productionTotalsFetchFulfilled,
  productionTotalsFetchRejected, PRODUCTION_TOTALS_FETCH_REJECTED, PRODUCTION_TOTALS_FETCH_FULFILLED
} from '../actions/productionTotals';

const delay = 4; // 4s delay for interactive use of cancel/take latest

const productionTotalsFetchLogic = createLogic({
  type: PRODUCTION_TOTALS_FETCH,
  cancelType: PRODUCTION_TOTALS_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: productionTotalsFetchFulfilled, // INVERTER_DAILY_POWER_FETCH_FULFILLED, //
    failType: productionTotalsFetchRejected // INVERTER_DAILY_POWER_FETCH_REJECTED //productionTotalsFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return axios.get(`http://${MICROCONTROLLER_ADRESS}/${PRODUCTION_TOTALS_ENDPOINT}`)
      .then((respOri) => {
        const resp = { ...respOri };
        resp.data.lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        resp.data.energyLifetime = parseInt(resp.data.energyLifetime);
        resp.data.energyYearly = parseInt(resp.data.energyYearly);
        resp.data.energyMonthly = parseInt(resp.data.energyMonthly);
        resp.data.energyWeekly = parseInt(resp.data.energyWeekly);
        resp.data.energyDaily = parseInt(resp.data.energyDaily);
        return resp.data;
      });
    // .then(data => dispatch({ type:PRODUCTION_TOTALS_FETCH_FULFILLED, payload: data }))
    // .catch(err => {
    //     console.error(err); // log since might be a render err
    //     dispatch({ type:PRODUCTION_TOTALS_FETCH_REJECTED, payload: err, error: true });
    // })
    // .then(() => done()); // call when finished dispatching;
  }
});

export default [
  productionTotalsFetchLogic
];
