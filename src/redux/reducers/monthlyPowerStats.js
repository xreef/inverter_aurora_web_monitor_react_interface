import { key, MONTHLY_POWER_STATS_FETCH, MONTHLY_POWER_STATS_FETCH_CANCEL, MONTHLY_POWER_STATS_FETCH_FULFILLED,
         MONTHLY_POWER_STATS_FETCH_REJECTED } from '../actions/monthlyPowerStats';

export const selectors = {
  monthlyData: state => state[key].list,
  fetchStatus: state => state[key].fetchStatus
};

const initialState = {
  month: '',
  list: [],
  fetchStatus: '',
  lastUpdate: null
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case MONTHLY_POWER_STATS_FETCH:
    return {
      ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        list: [],
        month: action.month
    };
      case MONTHLY_POWER_STATS_FETCH_FULFILLED:
    return {
      ...state,
        list: action.list,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate
    };
  case MONTHLY_POWER_STATS_FETCH_REJECTED:
    return {
      ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
    };
  case MONTHLY_POWER_STATS_FETCH_CANCEL:
    return {
      ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
    };
  default:
    return state;
  }
}
