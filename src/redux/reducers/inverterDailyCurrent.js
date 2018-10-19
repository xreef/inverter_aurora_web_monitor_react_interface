import { key, INVERTER_DAILY_CURRENT_FETCH, INVERTER_DAILY_CURRENT_FETCH_CANCEL, INVERTER_DAILY_CURRENT_FETCH_FULFILLED,
         INVERTER_DAILY_CURRENT_FETCH_REJECTED } from '../actions/inverterDailyCurrent';

export const selectors = {
  currents: state => state[key].list,
  fetchStatus: state => state[key].fetchStatus
};

const initialState = {
  day: '',
  dataType: 'current',
  list: [],
  fetchStatus: '',
  lastUpdate: null
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case INVERTER_DAILY_CURRENT_FETCH:
    return {
      ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        list: [],
        day: action.day,
        dataType: action.dataType || state.dataType
    };
      case INVERTER_DAILY_CURRENT_FETCH_FULFILLED:
    return {
      ...state,
        list: action.list,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: new Date()
    };
  case INVERTER_DAILY_CURRENT_FETCH_REJECTED:
    return {
      ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
    };
  case INVERTER_DAILY_CURRENT_FETCH_CANCEL:
    return {
      ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
    };
  default:
    return state;
  }
}
