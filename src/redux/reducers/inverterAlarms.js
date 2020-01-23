import {
  key, INVERTER_ALARMS_FETCH, INVERTER_ALARMS_FETCH_CANCEL, INVERTER_ALARMS_FETCH_FULFILLED,
  INVERTER_ALARMS_FETCH_REJECTED
} from '../actions/inverterAlarms';

export const selectors = {
  data: state => state,
  fetchStatus: state => state.fetchStatus
};

const initialState = {
  data: null,
  fetchStatus: '',
  isFetching: false,
  lastUpdate: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INVERTER_ALARMS_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        data: null,
        lastUpdate: null
      };
    case INVERTER_ALARMS_FETCH_FULFILLED:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate
      };
    case INVERTER_ALARMS_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case INVERTER_ALARMS_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    default:
      return state;
  }
}
