import {
  PRODUCTION_TOTALS_FETCH, PRODUCTION_TOTALS_FETCH_CANCEL, PRODUCTION_TOTALS_FETCH_FULFILLED,
  PRODUCTION_TOTALS_FETCH_REJECTED
} from '../actions/productionTotals';

export const selectors = {
  energyLifetime: state => state.productionTotals.energyLifetime,
  energyYearly: state => state.productionTotals.energyYearly,
  energyMonthly: state => state.productionTotals.energyMonthly,
  energyWeekly: state => state.productionTotals.energyWeekly,
  energyDaily: state => state.productionTotals.energyDaily,
  lastUpdate: state => state.productionTotals.lastUpdate,
  fetchStatus: state => state.productionTotals.fetchStatus
};

const initialState = {
  energyLifetime: null,
  energyYearly: null,
  energyMonthly: null,
  energyWeekly: null,
  energyDaily: null,
  lastUpdate: null,
  fetchStatus: null,
  isFetching: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTION_TOTALS_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        energyLifetime: null,
        energyYearly: null,
        energyMonthly: null,
        energyWeekly: null,
        energyDaily: null,
        lastUpdate: null
      };
    case PRODUCTION_TOTALS_FETCH_FULFILLED:
      return {
        ...state,
        energyLifetime: action.energyLifetime,
        energyYearly: action.energyYearly,
        energyMonthly: action.energyMonthly,
        energyWeekly: action.energyWeekly,
        energyDaily: action.energyDaily,
        lastUpdate: action.lastUpdate,

        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`
      };
    case PRODUCTION_TOTALS_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case PRODUCTION_TOTALS_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    default:
      return state;
  }
}
