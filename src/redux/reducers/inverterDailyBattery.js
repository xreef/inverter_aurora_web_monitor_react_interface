import {
  key, INVERTER_BATTERY_FETCH, INVERTER_BATTERY_FETCH_CANCEL, INVERTER_BATTERY_FETCH_FULFILLED,
  INVERTER_BATTERY_FETCH_REJECTED
} from '../actions/inverterDailyBattery';

export const selectors = {
  battery: state => state[key].list,
  fetchStatus: state => state[key].fetchStatus
};

const initialState = {
  day: '',
  dataType: 'battery',
  list: [],
  fetchStatus: '',
  lastUpdate: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INVERTER_BATTERY_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        list: [],
        day: action.day,
        dataType: action.dataType || state.dataType
      };
    case INVERTER_BATTERY_FETCH_FULFILLED:
      return {
        ...state,
        list: action.list,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: new Date()
      };
    case INVERTER_BATTERY_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case INVERTER_BATTERY_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    default:
      return state;
  }
}
