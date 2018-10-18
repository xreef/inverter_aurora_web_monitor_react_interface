import { key, INVERTER_DAILY_FETCH, INVERTER_DAILY_FETCH_CANCEL, INVERTER_DAILY_FETCH_FULFILLED,
         INVERTER_DAILY_FETCH_REJECTED } from '../actions/inverterDaily';

export const selectors = {
  users: state => state[key].list,
  fetchStatus: state => state[key].fetchStatus
};

const initialState = {
  day: '',
  dataType: '',
  list: [],
  fetchStatus: ''
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case INVERTER_DAILY_FETCH:
    return {
      ...state,
      fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
      list: [],
      day: action.day,
      dataType: action.dataType,
    };
  case INVERTER_DAILY_FETCH_FULFILLED:
    return {
      ...state,
      list: action.payload,
      fetchStatus: `Results from ${(new Date()).toLocaleString()}`
    };
  case INVERTER_DAILY_FETCH_REJECTED:
    return {
      ...state,
      fetchStatus: `errored: ${action.payload}`
    };
  case INVERTER_DAILY_FETCH_CANCEL:
    return {
      ...state,
      fetchStatus: 'user cancelled'
    };
  default:
    return state;
  }
}
