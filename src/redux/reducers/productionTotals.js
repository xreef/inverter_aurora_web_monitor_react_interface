import { PRODUCTION_TOTALS_FETCH, PRODUCTION_TOTALS_FETCH_CANCEL, PRODUCTION_TOTALS_FETCH_FULFILLED,
         PRODUCTION_TOTALS_FETCH_REJECTED } from '../actions/productionTotals';

export const selectors = {
    energyLifetime: state => state.energyLifetime,
    energyYearly: state => state.energyYearly,
    energyMonthly: state => state.energyMonthly,
    energyWeekly: state => state.energyWeekly,
    lastUpdate:  state => state.lastUpdate,
    fetchStatus: state => state.fetchStatus
};

const initialState = {
    energyLifetime: null,
    energyYearly: null,
    energyMonthly: null,
    energyWeekly: null,
    lastUpdate: null,
    fetchStatus: null,
    isFetching: false
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case PRODUCTION_TOTALS_FETCH:
    return {
      ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        energyLifetime: null,
        energyYearly: null,
        energyMonthly: null,
        energyWeekly: null,
        lastUpdate: null
    };
      case PRODUCTION_TOTALS_FETCH_FULFILLED:
    return {
      ...state,
        energyLifetime: action.energyLifetime,
        energyYearly: action.energyYearly,
        energyMonthly: action.energyMonthly,
        energyWeekly: action.energyWeekly,
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
